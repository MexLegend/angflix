import { Injectable, WritableSignal, signal } from '@angular/core';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private watchList: WritableSignal<Movie[]> = signal([]);

  /**
   * Sets the watchlist in local storage and updates the value of the internal watchlist list.
   * @param watchList List of movies to be stored.
   * @returns Nothing.
   */
  setWatchList(watchList: Movie[]) {
    const moviesIds = watchList.map((item) => item.id);
    localStorage.setItem('watchList', JSON.stringify(moviesIds));
    this.watchList.set(watchList);
  }

  /**
   * Retrieves the watchlist stored in the local storage.
   * Fetches the watchlist data stored in the browser's local storage and converts it into an array of strings.
   * @returns The stored watchlist data as an array or an empty array if there's no data in the local storage.
   */
  getStorageWatchList(): string[] {
    const watchList = localStorage.getItem('watchList');
    return watchList ? JSON.parse(watchList) : [];
  }

  /**
   * Retrieves the writable signal representing the watchlist.
   * @returns Writable signal containing the list of movies in the watchlist.
   */
  getWatchList(): WritableSignal<Movie[]> {
    return this.watchList;
  }

  /**
   * Toggles the watchlist to add or remove a movie.
   * @param addToWatchList Boolean indicating whether to add to the watchlist.
   * @param movieId Identifier of the movie to add or remove from the list.
   * @returns Nothing.
   */
  toogleWatchList(addToWatchList: boolean, movie: Movie) {
    let updatedWatchList: Movie[];
    if (addToWatchList) updatedWatchList = [...this.watchList(), movie];
    else
      updatedWatchList = this.watchList().filter(
        (item) => item.id !== movie.id
      );
    this.setWatchList(updatedWatchList);
  }

  /**
   * Checks if a movie is in the watchlist.
   * @param movieId Identifier of the movie to check.
   * @returns Returns true if the movie is in the watchlist; otherwise, returns false.
   */
  isMovieInWatchList(movieId: string): boolean {
    return this.watchList().some((item) => item.id === movieId);
  }
}
