import { createReducer, on } from '@ngrx/store';

import { IMoviesState } from '../interfaces/movie.state';
import { MoviesApiActions } from '../actions/movies.actions';

export const initialState: IMoviesState = {
	movies: [],
	loading: false,
	error: null
};

export const moviesReducer = createReducer(
	initialState,
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

