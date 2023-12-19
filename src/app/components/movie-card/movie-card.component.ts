import { Component, Input, OnInit, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMovie } from 'src/app/interfaces/movie';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { WatchlistButtonComponent } from '../watchlist-button/watchlist-button.component';
import { RatingStarsComponent } from '../rating-stars/rating-stars.component';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Store } from '@ngrx/store';
import { isMovieInWatchList } from 'src/app/state/selectors/watchlist.selector';

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
	private readonly _movieService: MovieService = inject(MovieService);

	isMovieInWatchList!: Signal<boolean>;
	movieDate!: Signal<Date>;
	movieRating!: Signal<number>;

	ngOnInit(): void {
		this.isMovieInWatchList = this._store.selectSignal(isMovieInWatchList(this.movie.id));
		this.movieDate = computed(() => new Date(this.movie.release_date));
		this.movieRating = computed(() => this._movieService.getMovieRating(this.movie));
	}
}
