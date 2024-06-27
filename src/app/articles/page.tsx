import ArticleItem from "@/Components/articles/articleItem";
import { Article } from "../utils/types";
import type { Metadata } from "next";
import SearchArticleInput from "@/Components/articles/searchArticleInput";
import Pagination from "@/Components/articles/pagination";

const Articles = async () => {

  // await new Promise((resolve)=> setTimeout(resolve, 2000));

  const response = await fetch("https://jsonplaceholder.typicode.com/posts",
   {next: {revalidate: 50}}
  );

  if(!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  const articles: Article[] = await response.json();
  return (
    <section className="container m-auto px-5 fix-height">
      <SearchArticleInput />
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.slice(0, 6).map(item => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination />
    </section>
  )
}

export default Articles


export const metadata: Metadata = {
  title: "Articles Page",
  description: "Articles Page Description",
};
