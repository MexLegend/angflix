import { Component, Input, OnInit, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMovie } from 'src/app/interfaces/movie';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { WatchlistButtonComponent } from '../watchlist-button/watchlist-button.component';
import { RatingStarsComponent } from '../rating-stars/rating-stars.component';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { isMovieInWatchList } from 'src/app/state/selectors/watchlist.selector';
import { environment } from 'src/environments/environment.development';

@Component({
	selector: 'app-movie-card',
	standalone: true,
	imports: [CommonModule, PlayButtonComponent, WatchlistButtonComponent, RatingStarsComponent, RouterModule],
	templateUrl: './movie-card.component.html',
	styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
	@Input({ required: true }) movie!: IMovie;

	private readonly _store: Store = inject(Store);

	isMovieInWatchList!: Signal<boolean>;
	movieDate!: Signal<Date>;
	movieThumbnail!: Signal<string>;

	ngOnInit(): void {
		this.isMovieInWatchList = this._store.selectSignal(isMovieInWatchList(this.movie.id));
		this.movieDate = computed(() => new Date(this.movie.release_date));
		this.movieThumbnail = computed(
			() => `${environment.MOVIES_IMAGES_ENDPOINT}/t/p/w500/${this.movie.poster_path}`
		);
	}
}
