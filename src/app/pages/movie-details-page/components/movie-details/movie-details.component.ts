import { Component, Input, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from 'src/app/interfaces/movie';
import { RatingStarsComponent } from 'src/app/components/rating-stars/rating-stars.component';
import { MovieService } from 'src/app/services/movie.service';
import { MovieDetailsTagComponent } from '../movie-details-tag/movie-details-tag.component';
import { WatchlistButtonComponent } from 'src/app/components/watchlist-button/watchlist-button.component';
import { WatchlistService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule,
    RatingStarsComponent,
    MovieDetailsTagComponent,
    WatchlistButtonComponent,
  ],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent {
  @Input() movie!: Movie;

  constructor(
    private movieService: MovieService,
    private watchlistService: WatchlistService
  ) {}

  isMovieInWatchList: Signal<boolean> = computed(() =>
    this.watchlistService.isMovieInWatchList(this.movie.id)
  );

  movieRating: Signal<number> = computed(() =>
    this.movieService.getMovieRating(this.movie)
  );
}
