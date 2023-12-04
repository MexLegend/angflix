import { MovieFilter } from '../interfaces/movie-filter';

export const movieFilters: MovieFilter[] = [
  {
    key: 'Title',
    value: 'title',
    asc: true,
  },
  {
    key: 'Release Date',
    value: 'releasedDate',
    asc: false,
  },
  {
    key: 'Z to A',
    value: 'title',
    asc: false,
  },
  {
    key: 'Oldest to Newest',
    value: 'releasedDate',
    asc: true,
  },
];
