import { Injectable, inject } from '@angular/core';
import { IMovie } from '../interfaces/movie';
import { Store } from '@ngrx/store';
import { WatchlistActions } from '../state/actions/movies.actions';

@Injectable({
	providedIn: 'root'
})
export class WatchlistService {
	private readonly _store: Store = inject(Store);

	/**
	 * Sets the watchlist in local storage and updates the value of the watchlist state.
	 * @param watchList List of movies to be stored.
	 * @returns Nothing.
	 */
	setWatchList(watchList: IMovie[]) {
		const moviesIds = watchList.map((item) => item.id);
		localStorage.setItem('watchList', JSON.stringify(moviesIds));
		this._store.dispatch(WatchlistActions.watchlist({ watchList }));
	}

	/**
	 * Retrieves the watchlist stored in the local storage.
	 * Fetches the watchlist data stored in the browser's local storage and converts it into an array of strings.
	 * @returns The stored watchlist data as an array or an empty array if there's no data in the local storage.
	 */
	getStorageWatchList(): string[] {
		const watchList = localStorage.getItem('watchList');
		return watchList ? JSON.parse(watchList) : [];
	}

	/**
	 * Updates watchlist state.
	 * @param addToWatchList Boolean indicating whether to add to the watchlist.
	 * @param movieId The movie to add or remove from the list.
	 * @returns Nothing.
	 */
	toogleWatchList(addToWatchlist: boolean, movie: IMovie) {
		this._store.dispatch(WatchlistActions.toogleWatchlist({ addToWatchlist, movie }));
	}

}
