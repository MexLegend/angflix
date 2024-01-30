import { IMovieFilter } from '../interfaces/movie-filter';

export const movieFilters: IMovieFilter[] = [
  {
    key: 'A - Z',
    value: 'title',
    asc: true,
  },
  {
    key: 'Newest - Oldest',
    value: 'release_date',
    asc: false,
  },
  {
    key: 'Z - A',
    value: 'title',
    asc: false,
  },
  {
    key: 'Oldest - Newest',
    value: 'release_date',
    asc: true,
  },
];
