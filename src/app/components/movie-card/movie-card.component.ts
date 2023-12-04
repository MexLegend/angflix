import { Component, Input, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from 'src/app/interfaces/movie';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { WatchlistButtonComponent } from '../watchlist-button/watchlist-button.component';
import { RatingStarsComponent } from '../rating-stars/rating-stars.component';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { WatchlistService } from '../../services/watchlist.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    CommonModule,
    PlayButtonComponent,
    WatchlistButtonComponent,
    RatingStarsComponent,
    RouterModule,
  ],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  @Input() movie!: Movie;

  constructor(
    private movieService: MovieService,
    private watchlistService: WatchlistService
  ) {}

  isMovieInWatchList: Signal<boolean> = computed(() =>
    this.watchlistService.isMovieInWatchList(this.movie.id)
  );
  movieDate: Signal<Date> = computed(() => new Date(this.movie.releasedDate));

  movieRating: Signal<number> = computed(() =>
    this.movieService.getMovieRating(this.movie)
  );
}
