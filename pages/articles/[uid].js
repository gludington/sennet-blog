import Head from "next/head";
import { PrismicLink, PrismicText, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import * as prismic from "@prismicio/client";

import { createClient } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";
import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";
import { HorizontalDivider } from "../../components/HorizontalDivider";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const LatestArticle = ({ article }) => {
  const date = prismicH.asDate(
    article.data.publishDate || article.first_publication_date
  );

  return (
    <>
      <h1 className="mb-3 text-3xl inkTitle tracking-tighter text-slate-800 md:text-4xl flex ">
        <PrismicLink document={article}>
          <PrismicText field={article.data.title} />
        </PrismicLink>
      </h1>
      <h3 className="font-serif italic tracking-tighter text-slate-500">
        {dateFormatter.format(date)}
      </h3>
      </>
  );
};

const Article = ({ article, nextArticle, previousArticle, latestArticles, navigation, settings }) => {
  const date = prismicH.asDate(
    article.data.publishDate || article.first_publication_date
  );

  return (
    <Layout
      withHeaderDivider={false}
      withProfile={false}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>
          {prismicH.asText(article.data.title)} |{" "}
          {prismicH.asText(settings.data.name)}
        </title>
      </Head>
      <Bounded>
        <PrismicLink
          href="/"
          className="font-semibold tracking-tight text-slate-800 cursive"
        >
          &larr; Back to articles
        </PrismicLink>
      </Bounded>
      <article>
        <Bounded className="pb-0">
          <h1 className="mb-3 text-3xl inkTitle tracking-tighter text-slate-800 md:text-4xl">
            <PrismicText field={article.data.title} />
          </h1>
          <h3 className="font-serif italic tracking-tighter text-slate-500">
            {dateFormatter.format(date)}
          </h3>
        </Bounded>
        <SliceZone slices={article.data.slices} components={components} />
      </article>
      <HorizontalDivider />
      <div class="w-full flex gap-16 md:gap">
        <div className="w-1/2">
          {previousArticle ? (
            <>
              <Heading size="2xl" className="mt-10 cursive">
                Previous:
              </Heading>
            <LatestArticle key={previousArticle.id} article={previousArticle} />
              </>
          ) : null}
            </div>
            <div className="w-1/2">
              <Heading size="2xl" className="mt-10 cursive">
                Next:
              </Heading>
                    <LatestArticle key={nextArticle.id} article={nextArticle} />
            </div>
    </div>
        
    </Layout>
  );
};

export default Article;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const article = await client.getByUID("article", params.uid);
  const latestArticles = await client.getAllByType("article", {
    limit: 3,
    orderings: [
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });
  
  let previousArticle;
  try {
    previousArticle = (await client.get({
      pageSize: 1,
      predicates: [
        prismic.predicate.at('document.type', 'article'),
        prismic.predicate.dateBefore("document.first_publication_date", article.first_publication_date)
      ],
      orderings: [
        { field: "document.first_publication_date", direction: "desc" },
      ],
    }))?.results?.[0] || null;
  
  } catch (err) {
    previousArticle = null;
  }
  
  let nextArticle;
  try {
    nextArticle = (await client.get({
      pageSize: 1,
      predicates: [
        prismic.predicate.at('document.type', 'article'),
        prismic.predicate.dateAfter("document.first_publication_date", article.first_publication_date)
      ],
      orderings: [
        { field: "document.first_publication_date", direction: "asc" },
      ],
    }))?.results?.[0] || null;
  
  } catch (err) {
    nextArticle = null;
  }

  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
      article,
      nextArticle,
      previousArticle,
      latestArticles,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const articles = await client.getAllByType("article");

  return {
    paths: articles.map((article) => prismicH.asLink(article)),
    fallback: false,
  };
}
