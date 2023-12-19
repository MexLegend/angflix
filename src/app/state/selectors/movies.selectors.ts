import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMoviesState } from '../interfaces/movie.state';

const selectMoviesFeature = createFeatureSelector<IMoviesState>('movies');

export const selectMovies = createSelector(selectMoviesFeature, (state: IMoviesState) => state);

export const selectRandomMovie = createSelector(selectMovies, (moviesState: IMoviesState) => {
	const { movies } = moviesState;
	const moviesCount = movies.length;
	const randomIndex = Math.floor(Math.random() * moviesCount);

	return movies[randomIndex];
});
