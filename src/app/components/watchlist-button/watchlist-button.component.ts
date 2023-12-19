import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { IMovie } from 'src/app/interfaces/movie';
import { WatchlistActions } from 'src/app/state/actions/watchlist.actions';

@Component({
	selector: 'app-watchlist-button',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './watchlist-button.component.html',
	styleUrls: ['./watchlist-button.component.scss']
})
export class WatchlistButtonComponent {
	@Input() movie!: IMovie;
	@Input() isInWatchList: boolean = false;

	private _store: Store = inject(Store);

	/**
	 * Toogles watchlist state when clicking the button.
	 * Calls the dispatch method in the Watchlist Actions to add or remove the movie from the list.
	 * @param event Mouse event triggering the action.
	 * @returns Nothing.
	 */
	toogleMovieWatchList(event: MouseEvent) {
		event.stopPropagation();
		this._store.dispatch(WatchlistActions.toogleWatchlist({ addToWatchlist: !this.isInWatchList, movie: this.movie }));
	}
}
