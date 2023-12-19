import { createReducer, on } from '@ngrx/store';

import { WatchlistActions } from '../actions/watchlist.actions';
import { IMovie } from 'src/app/interfaces/movie';
import { IWatchlistState } from '../interfaces/watchlist.state';

export const initialState: IWatchlistState = {
	watchlist: [],
	loading: false,
	error: null
};

export const watchlistReducer = createReducer(
	initialState,
	on(WatchlistActions.loadWatchlist, (state) => ({
		...state,
		loading: true,
		error: null
	})),
	on(WatchlistActions.loadWatchlistSuccess, (state, { watchlist }) => ({
		...state,
		watchlist,
		loading: false
	})),
	on(WatchlistActions.loadWatchlistFailure, (state, { error }) => ({
		...state,
		watchlist: [],
		loading: false,
		error
	})),
	on(WatchlistActions.toogleWatchlist, (state, { addToWatchlist, movie }) => ({
		...state,
		watchlist: toogleWatchList(state.watchlist, addToWatchlist, movie)
	}))
);

/**
 * Toggles the watchlist to add or remove a movie.
 * @param addToWatchList Boolean indicating whether to add to the watchlist.
 * @param movie The movie to add or remove from the list.
 * @returns The updated watchlist.
 */
const toogleWatchList = (watchlist: ReadonlyArray<IMovie>, addToWatchList: boolean, movie: IMovie) => {
	let updatedWatchList: IMovie[];
	if (addToWatchList) updatedWatchList = [...watchlist, movie];
	else updatedWatchList = watchlist.filter((item) => item.id !== movie.id);
	setWatchList(updatedWatchList);
	return updatedWatchList;
};

/**
 * Sets the watchlist in local storage and updates the value of the watchlist state.
 * @param watchList List of movies to be stored.
 * @returns Nothing.
 */
const setWatchList = (watchList: IMovie[]) => {
	const moviesIds = watchList.map((item) => item.id);
	localStorage.setItem('watchList', JSON.stringify(moviesIds));
};
