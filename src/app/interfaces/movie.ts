export interface Movie {
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

export interface MovieIdsAndGenres {
  movieIds: string[];
  genres: string[];
}
