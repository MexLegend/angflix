import { Component, Input, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from 'src/app/interfaces/movie';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { WatchlistButtonComponent } from '../watchlist-button/watchlist-button.component';
import { RatingStarsComponent } from '../rating-stars/rating-stars.component';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';

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

  constructor(private movieService: MovieService) {}

  movieRating: Signal<number> = computed(() =>
    this.movieService.getMovieRating(this.movie)
  );
}
