import ArticleItem from "@/Components/articles/articleItem";
import { Article } from "@prisma/client";
import type { Metadata } from "next";
import SearchArticleInput from "@/Components/articles/searchArticleInput";
import Pagination from "@/Components/articles/pagination";
import { getArticles } from "../api/apiCalls/articleApiCall";
import { ARTICLE_PER_PAGE } from "../utils/constants";
import prisma from "../utils/db";


interface ArticlesProps {
  searchParams: {pageNumber: string}

};


const Articles = async ({searchParams}: ArticlesProps) => {

  // await new Promise((resolve)=> setTimeout(resolve, 2000));

  const {pageNumber} = searchParams;
  const count: number = await prisma.article.count()
  const articles: Article[] = await getArticles(pageNumber);

  const pages = Math.ceil(count / ARTICLE_PER_PAGE);
  return (
    <section className="container m-auto px-5 fix-height">
      <SearchArticleInput />
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.map(item => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination pageNumber={parseInt(pageNumber)}  route="/articles" pages={pages}/>
    </section>
  )
}

export default Articles


export const metadata: Metadata = {
  title: "Articles Page",
  description: "Articles Page Description",
};
