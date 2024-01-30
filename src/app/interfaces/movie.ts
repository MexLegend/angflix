export interface IMoviesResponse {
  page: number;
  results: ReadonlyArray<IMovie>;
  total_pages: number;
  total_results: number;
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieDetails extends IMovie {
  budget: number;
  genres: IGenre[];
  imdb_id: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IMockedMovie {
  id: string;
  title: string;
  description: string;
  rating: number;
  duration: string;
  genre: string[];
  releasedDate: string;
  trailerLink: string;
  thumbnail: string;
}
