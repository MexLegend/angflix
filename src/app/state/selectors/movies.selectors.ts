import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMoviesSearchState, IMoviesState } from '../interfaces/movie.state';

const selectMoviesListFeature = createFeatureSelector<IMoviesState>('movies');

const selectMoviesSearchFeature = createFeatureSelector<IMoviesSearchState>('moviesSearch');

export const selectMovies = createSelector(selectMoviesListFeature, (state: IMoviesState) => state);

export const selectRandomMovie = createSelector(selectMovies, (moviesState: IMoviesState) => {
	const { movies } = moviesState;
	const moviesCount = movies.length;
	const randomIndex = Math.floor(Math.random() * moviesCount);

	return movies[randomIndex];
});

export const selectMoviesSearch = createSelector(selectMoviesSearchFeature, (state: IMoviesSearchState) => state);
