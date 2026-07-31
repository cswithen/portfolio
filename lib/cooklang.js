/**
 * Minimal CookLang parser.
 *
 * Supports the subset of the spec used by this collection:
 *   - YAML-ish frontmatter between --- fences
 *   - @ingredient, @multi word ingredient{qty%unit}(note)
 *   - @./Other Recipe{qty%unit}  -> cross-recipe reference
 *   - #cookware, #multi word cookware{}
 *   - ~{qty%unit} and ~named timer{qty%unit}
 *   - == Section == headers
 *   - -- line comments and [- block comments -]
 *
 * Parsing happens at build time only (getStaticProps), so this never ships
 * to the browser.
 */

export function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseQuantity(raw) {
  // "16%oz" -> { quantity: "16", unit: "oz" }
  // "3-5%minutes" -> { quantity: "3-5", unit: "minutes" }
  // "" -> { quantity: "", unit: "" }
  if (raw == null) return { quantity: "", unit: "" };
  const idx = raw.indexOf("%");
  if (idx === -1) return { quantity: raw.trim(), unit: "" };
  return {
    quantity: raw.slice(0, idx).trim(),
    unit: raw.slice(idx + 1).trim(),
  };
}

function stripComments(source) {
  return source
    .replace(/\[-[\s\S]*?-\]/g, "") // block comments
    .replace(/(^|\s)--.*$/gm, "$1"); // line comments
}

function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { metadata: {}, body: source };

  const metadata = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const sep = line.indexOf(":");
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    const value = line.slice(sep + 1).trim();
    if (key) metadata[key] = value;
  }

  return { metadata, body: source.slice(match[0].length) };
}

/**
 * Read a {...} block starting at `start` (which must point at "{").
 * Returns [contents, indexAfterClosingBrace] or null if unterminated.
 */
function readBraced(text, start, open = "{", close = "}") {
  if (text[start] !== open) return null;
  const end = text.indexOf(close, start + 1);
  if (end === -1) return null;
  return [text.slice(start + 1, end), end + 1];
}

// A bare (no-brace) name runs until whitespace or terminal punctuation.
function readBareName(text, start) {
  let i = start;
  while (i < text.length && !/[\s,.;:!?)]/.test(text[i])) i += 1;
  return [text.slice(start, i), i];
}

// A braced name runs from `start` up to the "{".
function readNameBeforeBrace(text, start) {
  const brace = text.indexOf("{", start);
  if (brace === -1) return null;
  const name = text.slice(start, brace);
  // Names never span lines; if one does, treat it as a bare token instead.
  if (name.includes("\n")) return null;
  return [name, brace];
}

function readToken(text, start) {
  const braced = readNameBeforeBrace(text, start);
  if (braced) {
    const [name, braceAt] = braced;
    const block = readBraced(text, braceAt);
    if (block) {
      const [amountRaw, afterBrace] = block;
      let note = "";
      let index = afterBrace;
      if (text[index] === "(") {
        const noteBlock = readBraced(text, index, "(", ")");
        if (noteBlock) {
          note = noteBlock[0];
          index = noteBlock[1];
        }
      }
      return { name: name.trim(), ...parseQuantity(amountRaw), note, index };
    }
  }
  const [name, index] = readBareName(text, start);
  return { name: name.trim(), quantity: "", unit: "", note: "", index };
}

function parseStep(line) {
  const items = [];
  let buffer = "";

  const flush = () => {
    if (buffer) {
      items.push({ type: "text", value: buffer });
      buffer = "";
    }
  };

  for (let i = 0; i < line.length; ) {
    const char = line[i];

    if (char === "@" || char === "#" || char === "~") {
      const token = readToken(line, i + 1);

      // "~" with no name and no braces is just a tilde in prose.
      if (!token.name && !token.quantity && !token.unit) {
        buffer += char;
        i += 1;
        continue;
      }

      flush();

      if (char === "@") {
        const isRecipeRef = token.name.startsWith("./");
        items.push({
          type: "ingredient",
          name: isRecipeRef ? token.name.slice(2).trim() : token.name,
          quantity: token.quantity,
          unit: token.unit,
          note: token.note,
          recipeRef: isRecipeRef,
        });
      } else if (char === "#") {
        items.push({ type: "cookware", name: token.name });
      } else {
        items.push({
          type: "timer",
          name: token.name,
          quantity: token.quantity,
          unit: token.unit,
        });
      }

      i = token.index;
      continue;
    }

    buffer += char;
    i += 1;
  }

  flush();
  return items;
}

export function parseRecipe(source) {
  const { metadata, body } = parseFrontmatter(source);
  const cleaned = stripComments(body);

  const sections = [];
  let current = { name: "", steps: [] };

  for (const block of cleaned.split(/\r?\n\s*\r?\n/)) {
    const text = block.trim();
    if (!text) continue;

    const heading = text.match(/^=+\s*(.*?)\s*=*$/);
    if (heading && text.startsWith("=")) {
      if (current.steps.length || current.name) sections.push(current);
      current = { name: heading[1].trim(), steps: [] };
      continue;
    }

    current.steps.push(parseStep(text.replace(/\r?\n/g, " ")));
  }
  if (current.steps.length || current.name) sections.push(current);

  const ingredients = [];
  const cookware = [];
  const timers = [];
  const seen = new Set();

  for (const section of sections) {
    for (const step of section.steps) {
      for (const item of step) {
        if (item.type === "ingredient") {
          const key = `${item.name}|${item.quantity}|${item.unit}`;
          if (!seen.has(key)) {
            seen.add(key);
            ingredients.push(item);
          }
        } else if (item.type === "cookware") {
          if (!cookware.some((c) => c.name === item.name)) cookware.push(item);
        } else if (item.type === "timer") {
          timers.push(item);
        }
      }
    }
  }

  const tags = metadata.tags
    ? metadata.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return {
    metadata,
    title: metadata.title || "",
    tags,
    sections,
    ingredients,
    cookware,
    timers,
  };
}
