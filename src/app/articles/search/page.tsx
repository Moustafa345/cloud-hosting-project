interface SearchArticlePageProps {
  searchParams: {searchText: string}
}



const SearchArticlePage = ({searchParams}:SearchArticlePageProps) => {

  console.log(searchParams);
  return (
    <div className="fix-height container m-auto px-5">
      <h1 className="text-2xl font-bold">Search text is {searchParams.searchText}</h1>
        </div>
  )
}

export default SearchArticlePage