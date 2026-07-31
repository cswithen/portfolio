import React from "react";
import Head from "next/head";
import Link from "next/link";

import { slugify } from "../../lib/cooklang";
import { getRecipeBySlug, getRecipeSlugs } from "../../lib/recipes";
import styles from "../../styles/Recipe.module.css";

function amount(quantity, unit) {
  return [quantity, unit].filter(Boolean).join(" ");
}

function StepItem({ item, knownSlugs }) {
  if (item.type === "text") return <>{item.value}</>;

  if (item.type === "cookware") {
    return <span className={styles.cookware}>{item.name}</span>;
  }

  if (item.type === "timer") {
    return (
      <span className={styles.timer}>{amount(item.quantity, item.unit)}</span>
    );
  }

  const label = <span className={styles.ingredientName}>{item.name}</span>;
  const measure = amount(item.quantity, item.unit);

  const body = (
    <>
      {label}
      {measure && <span className={styles.ingredientAmount}>{measure}</span>}
    </>
  );

  // Cross-recipe reference: link it only if that recipe actually exists.
  if (item.recipeRef) {
    const target = slugify(item.name);
    if (knownSlugs.includes(target)) {
      return (
        <Link href={`/codyscookbook/${target}`} className={styles.recipeRef}>
          {body}
        </Link>
      );
    }
    return <span className={styles.ingredient}>{body}</span>;
  }

  return <span className={styles.ingredient}>{body}</span>;
}

export default function RecipePage({ recipe, knownSlugs }) {
  const meta = recipe.metadata;
  const facts = [
    ["Prep", meta["prep time"]],
    ["Cook", meta["cook time"]],
    ["Serves", meta.servings],
    ["Course", meta.course],
    ["Cuisine", meta.cuisine],
  ].filter(([, value]) => Boolean(value));

  return (
    <div className={styles.page}>
      <Head>
        <title>{`${recipe.title} | Cody's Cookbook`}</title>
        <meta
          name="description"
          content={`${recipe.title} — a recipe from Cody's Cookbook.`}
        />
      </Head>

      <Link href="/codyscookbook" className={styles.backLink}>
        &#8592; All recipes
      </Link>

      <h1 className={styles.title}>{recipe.title}</h1>

      {meta.author && (
        <p className={styles.byline}>
          by{" "}
          {meta.source ? (
            <a href={meta.source} target="_blank" rel="noreferrer">
              {meta.author}
            </a>
          ) : (
            meta.author
          )}
        </p>
      )}

      {recipe.tags.length > 0 && (
        <ul className={styles.tags}>
          {recipe.tags.map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
      )}

      {facts.length > 0 && (
        <dl className={styles.facts}>
          {facts.map(([label, value]) => (
            <div key={label} className={styles.fact}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className={styles.columns}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sectionTitle}>Ingredients</h2>
          <ul className={styles.ingredientList}>
            {recipe.ingredients.map((item, index) => (
              <li key={`${item.name}-${index}`}>
                <span className={styles.listAmount}>
                  {amount(item.quantity, item.unit)}
                </span>{" "}
                {item.name}
                {item.note && (
                  <span className={styles.listNote}> ({item.note})</span>
                )}
              </li>
            ))}
          </ul>

          {recipe.cookware.length > 0 && (
            <>
              <h2 className={styles.sectionTitle}>Cookware</h2>
              <ul className={styles.ingredientList}>
                {recipe.cookware.map((item, index) => (
                  <li key={`${item.name}-${index}`}>{item.name}</li>
                ))}
              </ul>
            </>
          )}
        </aside>

        <div className={styles.method}>
          <h2 className={styles.sectionTitle}>Method</h2>
          {recipe.sections.map((section, sectionIndex) => (
            <section key={sectionIndex}>
              {section.name && (
                <h3 className={styles.subsection}>{section.name}</h3>
              )}
              <ol className={styles.steps}>
                {section.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className={styles.step}>
                    {step.map((item, itemIndex) => (
                      <StepItem
                        key={itemIndex}
                        item={item}
                        knownSlugs={knownSlugs}
                      />
                    ))}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: getRecipeSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { recipe, knownSlugs } = getRecipeBySlug(params.slug);
  if (!recipe) return { notFound: true };
  return { props: { recipe, knownSlugs } };
}
