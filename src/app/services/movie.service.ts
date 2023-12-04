import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { moviesList } from '../mocks/movies';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  /**
   * Retrieves a list of movies.
   * @returns Observable emitting the list of movies or an empty list in case of error.
   */
  getMovies(): Observable<Movie[]> {
    return of<Movie[]>(moviesList).pipe(
      catchError(this.handleError<Movie[]>([]))
    );
  }

  /**
   * Retrieves a movie by its ID.
   * @param movieId Identifier of the movie to retrieve.
   * @returns Observable that emits the movie corresponding to the ID or null if not found.
   */
  getMovieById(movieId: string): Observable<Movie | null> {
    const movie = moviesList.find((item) => item.id === movieId) || null;
    return of<Movie | null>(movie).pipe(
      catchError(this.handleError<null>(null))
    );
  }

  /**
   * Retrieves movies by genre excluding a specific movies by its IDs.
   * @param movieIds Identifier of the movies to exclude.
   * @param genres List of genres to filter the movies.
   * @returns Observable emitting the list of movies by genre excluding the specified movies, or an empty list in case of error.
   */
  getMoviesByGenre(movieIds: string[], genres: string[]): Observable<Movie[]> {
    const movies = moviesList.filter((movie) =>
      genres.some(
        (genre) => movie.genre.includes(genre) && !movieIds.includes(movie.id)
      )
    );
    return of<Movie[]>(movies).pipe(catchError(this.handleError<Movie[]>([])));
  }

  /**
   * Retrieves movies based on a provided movie title.
   * @param movieTitle The title used to filter movies.
   * @returns Observable of movies filtered by the provided title or an empty list in case of error.
   */
  getMoviesByTitle(movieTitle: string): Observable<Movie[]> {
    const movies = moviesList.filter((movie) =>
      movie.title.toLocaleLowerCase().includes(movieTitle.toLocaleLowerCase())
    );
    return of<Movie[]>(movies).pipe(catchError(this.handleError<Movie[]>([])));
  }

  /**
   * Retrieves movies based on the provided list of movie IDs.
   * Filters movies from the moviesList based on the movie IDs provided and returns them as an observable.
   * @param movieIds An array of movie IDs used to filter the moviesList.
   * @returns An observable emitting movies filtered by the provided IDs or an empty array in case of an error.
   */
  getMoviesByWatchList(movieIds: string[]): Observable<Movie[]> {
    const watchListMovies = moviesList.filter((movie) =>
      movieIds.some((watchListMovie) => watchListMovie === movie.id)
    );
    return of<Movie[]>(watchListMovies).pipe(
      catchError(this.handleError<Movie[]>([]))
    );
  }

  /**
   * Handles errors in HTTP requests.
   * @param value Default value to return in case of an error.
   * @returns Function that handles errors and returns an observable with a default value.
   */
  private handleError<T>(value: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log the error
      return of(value); // Return an empty result as fallback
    };
  }

  /**
   * Calculates the movie rating based on a scale of 10 and converts it to a scale of 5,
   * which is achieved by dividing the movie rating by two.
   * @param movie Movie for which the rating is to be obtained.
   * @returns Movie Rating / 2.
   */
  getMovieRating(movie: Movie): number {
    return movie.rating / 2;
  }
}
