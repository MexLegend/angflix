import { Component, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMovie } from 'src/app/interfaces/movie';
import { PlayButtonComponent } from '../../../../components/play-button/play-button.component';
import { WatchlistButtonComponent } from '../../../../components/watchlist-button/watchlist-button.component';
import { MovieTrailerComponent } from 'src/app/components/movie-trailer/movie-trailer.component';
import { Store } from '@ngrx/store';
import { isMovieInWatchList } from 'src/app/state/selectors/watchlist.selector';
import { MoviesState } from 'src/app/state/interfaces/movie.state';
import { selectMovies } from 'src/app/state/selectors/movies.selectors';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@Component({
	selector: 'app-hero',
	standalone: true,
	imports: [CommonModule, PlayButtonComponent, WatchlistButtonComponent, MovieTrailerComponent, LoaderComponent],
	templateUrl: './hero.component.html',
	styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
	private readonly _store: Store = inject(Store);
	moviesState: Signal<MoviesState> = this._store.selectSignal(selectMovies);

	randomMovie: Signal<IMovie> = computed(() => this.getRandomMovie());
	isMovieInWatchList: Signal<boolean> = this._store.selectSignal(isMovieInWatchList(this.randomMovie().id));

	/**
	 * Retrieves a random movie from the list of movies.
	 * @returns Randomly selected movie from the list.
	 */
	getRandomMovie(): IMovie {
		const { movies } = this.moviesState();

		const moviesCount = movies.length;
		const randomIndex = Math.floor(Math.random() * moviesCount);
		return movies[randomIndex] || '';
	}
}
