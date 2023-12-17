export interface IMovie {
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

export interface IMovieIdsAndGenres {
  movieIds: string[];
  genres: string[];
}
