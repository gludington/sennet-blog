import Head from "next/head";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import * as prismicH from "@prismicio/helpers";
import { Pagination } from "react-pagination-bar"
import 'react-pagination-bar/dist/index.css'
import { Layout } from "./Layout";
import { Bounded } from "./Bounded";
import { Heading } from "./Heading";
import { useRouter } from "next/router";

export const PAGE_SIZE = 5;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const findFirstImage = (slices) => {
  const imageSlice = slices.find((slice) => slice.slice_type === "image");

  if (imageSlice && prismicH.isFilled.image(imageSlice.primary.image)) {
    return imageSlice.primary.image;
  }
};

const getExcerpt = (slices) => {
  const text = slices
    .filter((slice) => slice.slice_type === "text")
    .map((slice) => prismicH.asText(slice.primary.text))
    .join(" ");

  const excerpt = text.substring(0, 300);

  if (text.length > 300) {
    return excerpt.substring(0, excerpt.lastIndexOf(" ")) + "…";
  } else {
    return excerpt;
  }
};

const Article = ({ article }) => {
  const featuredImage =
    (prismicH.isFilled.image(article.data.featuredImage) &&
      article.data.featuredImage) ||
    findFirstImage(article.data.slices);
  const date = prismicH.asDate(
    article.data.publishDate || article.first_publication_date
  );
  const excerpt = getExcerpt(article.data.slices);

  return (
    <li className="grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-8">
      <PrismicLink document={article} tabIndex={-1}>
        <div className="aspect-w-4 aspect-h-3 relative">
          {prismicH.isFilled.image(featuredImage) && (
            <PrismicNextImage
              field={featuredImage}
              fill={true}
              className="object-cover"
            />
          )}
        </div>
      </PrismicLink>
      <div className="grid grid-cols-1 gap-3 md:col-span-2">
        <Heading as="h3" className="inkTitle">
          <PrismicLink document={article}>
            <PrismicText field={article.data.title} />
          </PrismicLink>
        </Heading>
        <h4 className="font-serif italic tracking-tighter text-slate-500">
          {dateFormatter.format(date)}
        </h4>
        {excerpt && (
          <p className="leading-relaxed md:leading-relaxed">
          {excerpt}
          </p>
        )}
      </div>
    </li>
  );
};

const Index = ({ page, navigation, settings }) => {
  const articles = page.results;
  const router = useRouter();
  
  return (
    <Layout
      withHeaderDivider={false}
      withProfile={true}
      navigation={navigation}
      settings={settings}
    >
      <>
      <Head>
        <title>{prismicH.asText(settings.data.name)}</title>
      </Head>
        <Bounded size="widest">
          <>
        <ul className="grid grid-cols-1 gap-16">
              {articles.map((article, idx) => (
                  <Article key={article.id} article={article} index={page.page * PAGE_SIZE + idx} />
          ))}
            </ul>
            <div className="grid">
              <Pagination currentPage={page.page} itemsPerPage={PAGE_SIZE} totalItems={page.total_results_size} onPageChange={(num) => { router.push(num == 1 ? '/' : `/page/${num}`) }} />
              </div>
            </>
        </Bounded>
        </>
    </Layout>
  );
};

export default Index;