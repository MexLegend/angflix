import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WatchlistService } from './services/watchlist.service';
import { MovieService } from './services/movie.service';
import { Store } from '@ngrx/store';
import { WatchlistActions } from './state/actions/movies.actions';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, NavbarComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	private readonly _movieService: MovieService = inject(MovieService);
	private readonly _watchlistService: WatchlistService = inject(WatchlistService);
	private readonly _store: Store = inject(Store);

	/**
	 * Upon initializing the component, loads the watchlist from storage.
	 */
	ngOnInit(): void {
		this.setInitialWatchList();
	}

	/**
	 * Sets the initial watchlist state by fetching movies from storage.
	 * Retrieves the watchlist data from the storage, fetches movies based on the stored watchlist IDs,
	 * and sets the watchlist state.
	 * It unsubscribes from the subscription to prevent memory leaks
	 */
	setInitialWatchList() {
		const localStorageWatchList = this._watchlistService.getStorageWatchList();
		const getMoviesByWatchListSub$ = this._movieService
			.getMoviesByWatchList(localStorageWatchList)
			.subscribe((watchListMovies) => {
				this._store.dispatch(WatchlistActions.watchlist({ watchList: watchListMovies }));
				getMoviesByWatchListSub$.unsubscribe();
			});
	}
}
