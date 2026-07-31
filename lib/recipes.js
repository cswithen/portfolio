/**
 * Build-time helpers for the recipes/ directory.
 * Only imported from getStaticProps / getStaticPaths, never from a component.
 */
import fs from "fs";
import path from "path";

import { parseRecipe, slugify } from "./cooklang";

const RECIPES_DIR = path.join(process.cwd(), "recipes");

function readRecipeFiles() {
  if (!fs.existsSync(RECIPES_DIR)) return [];
  return fs
    .readdirSync(RECIPES_DIR)
    .filter((file) => file.toLowerCase().endsWith(".cook"));
}

function loadRecipe(file) {
  const source = fs.readFileSync(path.join(RECIPES_DIR, file), "utf8");
  const parsed = parseRecipe(source);
  const title = parsed.title || path.basename(file, path.extname(file));

  return {
    ...parsed,
    title,
    slug: slugify(title),
    file,
  };
}

export function getAllRecipes() {
  return readRecipeFiles()
    .map(loadRecipe)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getRecipeSlugs() {
  return getAllRecipes().map((recipe) => recipe.slug);
}

/**
 * Returns the recipe plus the set of slugs that exist, so cross-recipe
 * references can render as links only when the target actually exists.
 */
export function getRecipeBySlug(slug) {
  const all = getAllRecipes();
  const recipe = all.find((item) => item.slug === slug) || null;
  return { recipe, knownSlugs: all.map((item) => item.slug) };
}

/** Lightweight shape for the index page — no step tokens. */
export function getRecipeSummaries() {
  return getAllRecipes().map((recipe) => ({
    slug: recipe.slug,
    title: recipe.title,
    tags: recipe.tags,
    image: recipe.metadata.image || null,
    author: recipe.metadata.author || null,
    course: recipe.metadata.course || null,
    cuisine: recipe.metadata.cuisine || null,
    servings: recipe.metadata.servings || null,
    prepTime: recipe.metadata["prep time"] || null,
    cookTime: recipe.metadata["cook time"] || null,
    ingredientCount: recipe.ingredients.length,
  }));
}
