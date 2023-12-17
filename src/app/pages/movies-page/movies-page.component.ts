import { Component, OnInit, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { MovieService } from '../../services/movie.service';

import { IMovie } from 'src/app/interfaces/movie';

import { CategorySectionComponent } from '../../components/category-section/category-section.component';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { HeroComponent } from './components/hero/hero.component';
import { MoviesApiActions } from 'src/app/state/actions/movies.actions';
import { selectMovies } from 'src/app/state/selectors/movies.selectors';
import { selectWatchlist } from 'src/app/state/selectors/watchlist.selector';

@Component({
	selector: 'app-movies-page',
	standalone: true,
	imports: [CommonModule, HeroComponent, CategorySectionComponent, ContainerComponent],
	templateUrl: './movies-page.component.html',
	styleUrls: ['./movies-page.component.scss']
})
export class MoviesPageComponent implements OnInit {
	private readonly _store: Store = inject(Store);
	private readonly _movieService: MovieService = inject(MovieService);

	movies: Signal<ReadonlyArray<IMovie>> = this._store.selectSignal(selectMovies);
	watchList: Signal<ReadonlyArray<IMovie>> = this._store.selectSignal(selectWatchlist);

	ngOnInit(): void {
		this.getMovies();
	}

	/**
	 * Fetches movies data from the movie service.
	 * Sends a request to retrieve movies data and updates the 'movies' list.
	 * Unsubscribes from the subscription to prevent memory leaks.
	 */
	getMovies = () => {
		// Defines a subscription to fetch movie data
		const getMoviesSub$ = this._movieService.getMovies().subscribe((moviesResponse) => {
			// Update the 'movies' state with the received data
			this._store.dispatch(MoviesApiActions.movieList({ movies: moviesResponse }));
			// Unsubscribes from the subscription
			getMoviesSub$.unsubscribe();
		});
	};
}
