import { createReducer, on } from '@ngrx/store';

import {
  MoviesApiActions,
  MoviesSearchActions,
} from '../actions/movies.actions';
import { IMoviesSearchState, IMoviesState } from '../interfaces/movie.state';

export const initialMoviesListState: IMoviesState = {
  movies: [],
  page: 1,
  loading: false,
  error: null,
};

export const moviesReducer = createReducer(
  initialMoviesListState,
  on(MoviesApiActions.loadMovies, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MoviesApiActions.loadMoviesSuccess, (state, { movies }) => ({
    ...state,
    page: state.page + 1,
    movies: [...state.movies, ...movies],
    loading: false,
  })),
  on(MoviesApiActions.loadMoviesFailure, (state, { error }) => ({
    ...state,
    movies: state.movies,
    loading: false,
    error,
  }))
);

export const initialMoviesSearchState: IMoviesSearchState = {
  movieTitle: '',
  movies: [],
  page: 1,
  loading: false,
  error: null,
};

export const moviesSearchReducer = createReducer(
  initialMoviesSearchState,
  on(MoviesSearchActions.searchMovies, (state, { movieTitle }) => ({
    ...state,
    movieTitle,
    loading: true,
    error: null,
  })),
  on(MoviesSearchActions.searchMoviesSuccess, (state, { movies }) => ({
    ...state,
    page: state.page + 1,
    movies: [...state.movies, ...movies],
    loading: false,
  })),
  on(MoviesSearchActions.searchMoviesFailure, (state, { error }) => ({
    ...state,
    movies: state.movies,
    loading: false,
    error,
  })),
  on(MoviesSearchActions.resetSearchMovies, (state) => ({
    ...state,
    movies: [],
  }))
);
