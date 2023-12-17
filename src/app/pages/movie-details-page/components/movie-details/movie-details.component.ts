import { Component, Input, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMovie } from 'src/app/interfaces/movie';
import { RatingStarsComponent } from 'src/app/components/rating-stars/rating-stars.component';
import { MovieService } from 'src/app/services/movie.service';
import { MovieDetailsTagComponent } from '../movie-details-tag/movie-details-tag.component';
import { WatchlistButtonComponent } from 'src/app/components/watchlist-button/watchlist-button.component';
import { Store } from '@ngrx/store';
import { isMovieInWatchList } from 'src/app/state/selectors/watchlist.selector';

@Component({
	selector: 'app-movie-details',
	standalone: true,
	imports: [CommonModule, RatingStarsComponent, MovieDetailsTagComponent, WatchlistButtonComponent],
	templateUrl: './movie-details.component.html',
	styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
	@Input({ required: true }) movie!: IMovie;

	private readonly _store: Store = inject(Store);
	private readonly _movieService: MovieService = inject(MovieService);

	isMovieInWatchList: Signal<boolean> = this._store.selectSignal(isMovieInWatchList(this.movie.id));

	movieRating: Signal<number> = computed(() => this._movieService.getMovieRating(this.movie));
}
