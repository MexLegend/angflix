import { Component, Input, OnInit, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMovieDetails } from 'src/app/interfaces/movie';
import { RatingStarsComponent } from 'src/app/components/rating-stars/rating-stars.component';
import { MovieDetailsTagComponent } from '../movie-details-tag/movie-details-tag.component';
import { WatchlistButtonComponent } from 'src/app/components/watchlist-button/watchlist-button.component';
import { Store } from '@ngrx/store';
import { isMovieInWatchList } from 'src/app/state/selectors/watchlist.selector';
import { environment } from 'src/environments/environment.development';
import { MovieService } from 'src/app/services/movie.service';

@Component({
	selector: 'app-movie-details',
	standalone: true,
	imports: [CommonModule, RatingStarsComponent, MovieDetailsTagComponent, WatchlistButtonComponent],
	templateUrl: './movie-details.component.html',
	styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
	@Input({ required: true }) movie!: IMovieDetails;

	private readonly _store: Store = inject(Store);
	private readonly _movieService: MovieService = inject(MovieService);

	isMovieInWatchList!: Signal<boolean>;
	movieGenres!: Signal<string>;
	movieThumbnail!: Signal<string>;
	movieDuration!: Signal<string>;

	ngOnInit(): void {
		this.isMovieInWatchList = this._store.selectSignal(isMovieInWatchList(this.movie.id));
		this.movieGenres = computed(() => this.movie.genres.map((item) => item.name).join(', '));
		this.movieThumbnail = computed(() => `${environment.MOVIES_IMAGES_ENDPOINT}/t/p/w500/${this.movie.poster_path}`);
		this.movieDuration = computed(() => this._movieService.getFormatedMovieDuration(this.movie.runtime));
	}
}
