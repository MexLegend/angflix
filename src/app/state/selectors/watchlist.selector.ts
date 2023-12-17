import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMovie } from 'src/app/interfaces/movie';

const selectWatchlistFeature = createFeatureSelector<ReadonlyArray<IMovie>>('watchlist');

/**
 * @returns Returns the list of watchlist movies.
 */
export const selectWatchlist = createSelector(selectWatchlistFeature, (state: ReadonlyArray<IMovie>) => state);

/**
 * Checks if a movie is in the watchlist.
 * @param movieId Identifier of the movie to check.
 * @returns Returns true if the movie is in the watchlist; otherwise, returns false.
 */
export const isMovieInWatchList = (movieId: string) =>
	createSelector(selectWatchlist, (watchlist: ReadonlyArray<IMovie>) => {
		return watchlist.some((item) => item.id === movieId);
	});
