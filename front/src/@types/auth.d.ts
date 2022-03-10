interface User {
  username: string;
  pk: number | null;
  sns_id: string;
  sns_type: string;
  image?: string;
  like_actors?: Array<number>;
  like_movies?: Array<number>;
  review_set?: Array<number>;
  scrap_review?: Array<number>;
}
