import React, { useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import { getRecipeSummaries } from "../../lib/recipes";
import styles from "../../styles/Cookbook.module.css";

export default function Cookbook({ recipes }) {
  const [activeTag, setActiveTag] = useState("all");

  const tags = useMemo(() => {
    const all = new Set();
    recipes.forEach((recipe) => recipe.tags.forEach((tag) => all.add(tag)));
    return ["all", ...Array.from(all).sort()];
  }, [recipes]);

  const visible =
    activeTag === "all"
      ? recipes
      : recipes.filter((recipe) => recipe.tags.includes(activeTag));

  return (
    <div className={styles.page}>
      <Head>
        <title>Cody&apos;s Cookbook</title>
        <meta
          name="description"
          content="A collection of recipes written in CookLang."
        />
      </Head>

      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          &#8592; Back to portfolio
        </Link>
        <h1 className={styles.title}>Cody&apos;s Cookbook</h1>
        <p className={styles.subtitle}>
          {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"},
          written in{" "}
          <a href="https://cooklang.org" target="_blank" rel="noreferrer">
            CookLang
          </a>
          .
        </p>
      </header>

      {tags.length > 1 && (
        <div className={styles.filters}>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`${styles.filter} ${
                activeTag === tag ? styles.filterActive : ""
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <p className={styles.empty}>No recipes yet. Drop a .cook file in the recipes folder.</p>
      ) : (
        <ul className={styles.grid}>
          {visible.map((recipe) => (
            <li key={recipe.slug} className={styles.card}>
              <Link
                href={`/codyscookbook/${recipe.slug}`}
                className={styles.cardLink}
              >
                {recipe.image ? (
                  // Remote recipe images are arbitrary hosts, so use a plain
                  // <img> rather than next/image to avoid domain allowlisting.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className={styles.cardImage}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.cardPlaceholder} aria-hidden="true" />
                )}
                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{recipe.title}</h2>
                  <p className={styles.cardMeta}>
                    {[
                      recipe.cuisine,
                      recipe.servings,
                      recipe.cookTime ? `${recipe.cookTime} cook` : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  {recipe.tags.length > 0 && (
                    <p className={styles.cardTags}>
                      {recipe.tags.slice(0, 4).join(", ")}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function getStaticProps() {
  return { props: { recipes: getRecipeSummaries() } };
}
