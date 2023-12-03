import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { MoviesList } from '../mocks/movies';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  /**
   *
   * @returns List of movies if the request is successful;
   * otherwise, return an empty array
   */
  getMovies(): Observable<Movie[]> {
    return of<Movie[]>(MoviesList).pipe(
      catchError(this.handleError<Movie[]>([]))
    );
  }

  /**
   *
   * @returns List one movie if the request is successful;
   * otherwise, return null
   */
  getMovieById(movieId: string): Observable<Movie | null> {
    const movie = MoviesList.find((item) => item.id === movieId) || null;
    return of<Movie | null>(movie).pipe(
      catchError(this.handleError<null>(null))
    );
  }

  private handleError<T>(value: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log the error
      return of(value); // Return an empty result as fallback
    };
  }

  /**
   * Calculates the movie rating based on a scale of 10 and converts it to a scale of 5,
   * which is achieved by dividing the movie rating by two.
   * @returns Movie Rating / 2
   */
  getMovieRating(movie: Movie): number {
    return movie.rating / 2;
  }
}
