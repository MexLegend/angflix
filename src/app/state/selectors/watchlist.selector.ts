import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IWatchlistState } from '../interfaces/watchlist.state';

const selectWatchlistFeature = createFeatureSelector<IWatchlistState>('watchlist');

/**
 * @returns Returns the list of watchlist movies.
 */
export const selectWatchlist = createSelector(selectWatchlistFeature, (state: IWatchlistState) => state);

/**
 * Checks if a movie is in the watchlist.
 * @param movieId Identifier of the movie to check.
 * @returns Returns true if the movie is in the watchlist; otherwise, returns false.
 */
export const isMovieInWatchList = (movieId: number) =>
	createSelector(selectWatchlist, (watchlistState: IWatchlistState) => {
		return watchlistState.watchlist.some((item) => item.id === movieId);
	});
