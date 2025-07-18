export interface NYTArticle {
  _id: string;
  web_url: string;
  headline: {
    main: string;
  };
  snippet: string;
  pub_date: string;
  byline: {
    original?: string;
  };
}
