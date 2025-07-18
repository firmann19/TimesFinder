import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleCard from "../components/ArticleCard";
import SearchBar from "../components/SearchBar";
import { useSearchArticles } from "../services/useSearchArticles";

export default function Home() {
  const { articles, loading, error, search, fetchMore, hasMore } =
    useSearchArticles();

  const isEmpty = articles.length === 0 && !loading;

  return (
    <div className="max-w-xl mx-auto p-4">
      <SearchBar onSearch={search} />

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {isEmpty && <p className="text-gray-500 mt-2">No results found.</p>}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={
          loading && (
            <div className="space-y-4 mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border p-4 rounded animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/4 mb-4" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                </div>
              ))}
            </div>
          )
        }
        endMessage={
          !loading &&
          articles.length > 0 && (
            <p className="text-center text-sm text-gray-400 mt-4">
              Semua artikel sudah dimuat
            </p>
          )
        }
      >
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
