// src/services/useSearchArticles.ts
import { useState, useCallback } from "react";
import { searchArticles } from "../hooks/nyTimesAPI";

export function useSearchArticles() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(false);

  const search = async (newQuery: string) => {
    setLoading(true);
    setError("");
    try {
      const result = await searchArticles(newQuery, 0);
      setArticles(result);
      setPage(0);
      setQuery(newQuery);
      setHasMore(result.length > 0);
    } catch (e) {
      setError("Failed to retrieve data");
    } finally {
      setLoading(false);
    }
  };

  const fetchMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const result = await searchArticles(query, nextPage);
      setArticles((prev) => [...prev, ...result]);
      setPage(nextPage);
      setHasMore(result.length > 0);
    } catch (e) {
      setError("Failed to retrieve data");
    } finally {
      setLoading(false);
    }
  }, [query, page, loading, hasMore]);

  return { articles, loading, error, search, fetchMore, hasMore };
}
