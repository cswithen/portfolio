import React from "react";
import Head from "next/head";
import Link from "next/link";

import { getRecipeSummaries } from "../../lib/recipes";
import styles from "../../styles/Cookbook.module.css";

export default function Cookbook({ recipes }) {
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
      </header>

      {recipes.length === 0 ? (
        <p className={styles.empty}>
          No recipes yet. Drop a .cook file in the recipes folder.
        </p>
      ) : (
        <ul className={styles.grid}>
          {recipes.map((recipe) => (
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
