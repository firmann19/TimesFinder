import React from "react";
import { NYTArticle } from "../types/article";

interface Props {
  article: NYTArticle;
}

export default function ArticleCard({ article }: Props) {
  return (
    <div
      className="border p-4 mb-3 rounded cursor-pointer hover:bg-gray-50"
      onClick={() => window.open(article.web_url, "_blank")}
    >
      <h2 className="text-lg font-bold">{article.headline.main}</h2>
      <p className="text-sm text-gray-600">
        {article.byline?.original || "Unknown Author"}
      </p>
      <p className="text-sm text-gray-400">
        {new Date(article.pub_date).toDateString()}
      </p>
      <p className="mt-2 text-sm">{article.snippet}</p>
    </div>
  );
}
