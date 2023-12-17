import { createReducer, on } from '@ngrx/store';

import { IMovie } from 'src/app/interfaces/movie';
import { MoviesApiActions } from '../actions/movies.actions';

export const initialState: ReadonlyArray<IMovie> = [];

export const moviesReducer = createReducer(
	initialState,
	on(MoviesApiActions.movieList, (_state, { movies }) => movies)
);
