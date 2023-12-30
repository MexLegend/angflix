import { createReducer, on } from '@ngrx/store';

import { IMoviesSearchState, IMoviesState } from '../interfaces/movie.state';
import { MoviesApiActions, MoviesSearchActions } from '../actions/movies.actions';

export const initialMoviesListState: IMoviesState = {
	movies: [],
	loading: false,
	error: null
};

export const moviesReducer = createReducer(
	initialMoviesListState,
	on(MoviesApiActions.loadMovies, (state) => ({
		...state,
		loading: true,
		error: null
	})),
	on(MoviesApiActions.loadMoviesSuccess, (state, { movies }) => ({
		...state,
		movies,
		loading: false
	})),
	on(MoviesApiActions.loadMoviesFailure, (state, { error }) => ({
		...state,
		movies: [],
		loading: false,
		error
	}))
);

export const initialMoviesSearchState: IMoviesSearchState = {
	movieTitle: "",
	movies: [],
	loading: false,
	error: null
};

export const moviesSearchReducer = createReducer(
	initialMoviesSearchState,
	on(MoviesSearchActions.searchMovies, (state, { movieTitle }) => ({
		...state,
		movieTitle,
		loading: true,
		error: null
	})),
	on(MoviesSearchActions.searchMoviesSuccess, (state, { movies }) => ({
		...state,
		movies,
		loading: false
	})),
	on(MoviesSearchActions.searchMoviesFailure, (state, { error }) => ({
		...state,
		movies: [],
		loading: false,
		error
	}))
);


