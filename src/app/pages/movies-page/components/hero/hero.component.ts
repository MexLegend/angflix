import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayButtonComponent } from '../../../../components/play-button/play-button.component';
import { WatchlistButtonComponent } from '../../../../components/watchlist-button/watchlist-button.component';
import { MovieTrailerComponent } from 'src/app/components/movie-trailer/movie-trailer.component';
import { Store } from '@ngrx/store';
import { isMovieInWatchList } from 'src/app/state/selectors/watchlist.selector';
import { selectRandomMovie } from 'src/app/state/selectors/movies.selectors';

@Component({
	selector: 'app-hero',
	standalone: true,
	imports: [CommonModule, PlayButtonComponent, WatchlistButtonComponent, MovieTrailerComponent],
	templateUrl: './hero.component.html',
	styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
	private readonly _store: Store = inject(Store);

	randomMovie = this._store.selectSignal(selectRandomMovie);
	isMovieInWatchList: Signal<boolean> = this._store.selectSignal(isMovieInWatchList(this.randomMovie().id));
}
