import { createReducer, on } from '@ngrx/store';

import { WatchlistActions } from '../actions/movies.actions';
import { IMovie } from 'src/app/interfaces/movie';

export const initialState: ReadonlyArray<IMovie> = [];

export const watchListReducer = createReducer(
	initialState,
	on(WatchlistActions.watchlist, (_state, { watchList }) => watchList),
	on(WatchlistActions.toogleWatchlist, (_state, { addToWatchlist, movie }) =>
		toogleWatchList(_state, addToWatchlist, movie)
	)
);

/**
 * Toggles the watchlist to add or remove a movie.
 * @param addToWatchList Boolean indicating whether to add to the watchlist.
 * @param movie The movie to add or remove from the list.
 * @returns The updated watchlist.
 */
const toogleWatchList = (watchlist: ReadonlyArray<IMovie>, addToWatchList: boolean, movie: IMovie) => {
	let updatedWatchList: ReadonlyArray<IMovie>;
	if (addToWatchList) updatedWatchList = [...watchlist, movie];
	else updatedWatchList = watchlist.filter((item) => item.id !== movie.id);
	return updatedWatchList;
};
