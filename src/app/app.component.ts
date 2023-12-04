import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WatchlistService } from './services/watchlist.service';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * Upon initializing the component, loads the watchlist from storage.
   */
  constructor(
    private movieService: MovieService,
    private watchlistService: WatchlistService
  ) {
    this.setInitialWatchList();
  }

  /**
   * Sets the initial watchlist by fetching movies from storage and initializing the watchlist service.
   * Retrieves the watchlist data from the storage, fetches movies based on the stored watchlist IDs,
   * and sets the watchlist in the watchlist service.
   * It unsubscribes from the subscription after a short delay to prevent reference errors
   */
  setInitialWatchList() {
    const localStorageWatchList = this.watchlistService.getStorageWatchList();
    const getMoviesByWatchListSub$ = this.movieService
      .getMoviesByWatchList(localStorageWatchList)
      .subscribe((watchListMovies) => {
        this.watchlistService.setWatchList(watchListMovies);
        // Unsubscribes from the subscription after a brief delay to prevent reference errors
        setTimeout(() => getMoviesByWatchListSub$.unsubscribe(), 100);
      });
  }
}
