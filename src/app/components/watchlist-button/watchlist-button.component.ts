import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistService } from '../../services/watchlist.service';
import { IMovie } from 'src/app/interfaces/movie';

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

	private _watchlistService: WatchlistService = inject(WatchlistService);

	/**
	 * Toggle the movie's watchlist state when clicking the button.
	 * @param event Mouse event triggering the action.
	 * Prevents event propagation to avoid unwanted effects.
	 * Calls the method in the watchlist service to add or remove the movie from the list.
	 */
	toogleMovieWatchList(event: MouseEvent) {
		event.stopPropagation();
		this._watchlistService.toogleWatchList(!this.isInWatchList, this.movie);
	}
}
