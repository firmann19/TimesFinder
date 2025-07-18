import axios from "axios";

const API_KEY = import.meta.env.VITE_NYTIMES_API_KEY;
const BASE_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

export async function searchArticles(query: string, page: number = 0) {
  const res = await axios.get(BASE_URL, {
    params: {
      q: query,
      page,
      "api-key": API_KEY,
    },
  });
  return res.data.response.docs;
}
