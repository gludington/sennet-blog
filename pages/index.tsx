import { createClient } from "../prismicio";
import ArticlePage, { PAGE_SIZE } from "../components/ArticlePage"

const Index = (props) => <ArticlePage {...props}/>

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByType("article", {
    orderings: [
      { field: "document.first_publication_date", direction: "asc" },
    ],
    page: 1,
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
