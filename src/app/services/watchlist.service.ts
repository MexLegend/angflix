import { Injectable, inject } from '@angular/core';
import { IMovie } from '../interfaces/movie';
import { Store } from '@ngrx/store';
import { WatchlistActions } from '../state/actions/watchlist.actions';

@Injectable({
	providedIn: 'root'
})
export class WatchlistService {
	private readonly _store: Store = inject(Store);

	/**
	 * Retrieves the watchlist stored in the local storage.
	 * Fetches the watchlist data stored in the browser's local storage and converts it into an array of numbers.
	 * @returns The stored watchlist data as an array or an empty array if there's no data in the local storage.
	 */
	getStorageWatchList(): number[] {
		const watchList = localStorage.getItem('watchList');
		return watchList ? JSON.parse(watchList).map((item: string) => Number(item)) : [];
	}
}
