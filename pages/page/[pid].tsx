import { createClient, } from "../../prismicio";
import ArticlePage, { PAGE_SIZE } from "../../components/ArticlePage"
import * as prismic from "@prismicio/client";
const Index = (props) => <ArticlePage {...props}/>

export default Index;

export async function getStaticPaths() {
  const client = createClient();
  const articles = await client.getAllByType("article");
  let pg = 1;
  const paths = [`/page/${pg}`];
  let end = 0;
  while ((end = end + PAGE_SIZE) < articles.length) {
    paths.push(`/page/${++pg}`)
  };
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ previewData, ...params }) {
  const client = createClient({ previewData });

  const page = await client.get({
    predicates: [
      prismic.predicate.at("document.type", "article")
    ],
    orderings: [
      { field: "document.first_publication_date", direction: "asc" },
    ],
    page: params.params.pid,
    pageSize: PAGE_SIZE
  });

  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
      page,
      navigation,
      settings,
    },
  };
}
