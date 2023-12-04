import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { Movie } from 'src/app/interfaces/movie';
import { CategorySectionComponent } from '../../components/category-section/category-section.component';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { HeroComponent } from './components/hero/hero.component';
import { WatchlistService } from '../../services/watchlist.service';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    CategorySectionComponent,
    ContainerComponent,
  ],
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss'],
})
export class MoviesPageComponent {
  movies: WritableSignal<Movie[]> = signal([]);
  watchList: WritableSignal<Movie[]> = signal([]);

  constructor(
    private movieService: MovieService,
    private watchlistService: WatchlistService
  ) {
    this.getMovies();
    this.watchList = this.watchlistService.getWatchList();
  }

  /**
   * Fetches movies data from the movie service.
   * Sends a request to retrieve movies data and updates the 'movies' list.
   * Unsubscribes from the subscription after a brief interval to prevent reference errors.
   */
  getMovies = () => {
    // Defines a subscription to fetch movie data
    const getMoviesSub$ = this.movieService
      .getMovies()
      .subscribe((moviesResponse) => {
        // Updates the 'movies' list with the received data
        this.movies.set(moviesResponse);
        // Unsubscribes from the subscription after a brief delay to prevent reference errors
        setTimeout(() => getMoviesSub$.unsubscribe(), 100);
      });
  };
}
