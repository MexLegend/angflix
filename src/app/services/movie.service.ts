import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IMovie, IMovieDetails, IMoviesResponse } from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly http: HttpClient = inject(HttpClient);

  /**
   * Retrieves a list of movies.
   * @returns Observable emitting the list of movies or an empty list in case of error.
   */
  getMovies(page: number): Observable<ReadonlyArray<IMovie>> {
    const currentYear = new Date().getFullYear();
    const url = `${environment.MOVIES_ENDPOINT}/discover/movie`;
    const params = new HttpParams()
      .set('api_key', environment.MOVIES_API_KEY)
      .set('language', 'en-US')
      .set('primary_release_year', currentYear)
      .set('sort_by', 'popularity.desc')
      .set('page', page);

    return this.http
      .get<IMoviesResponse>(url, { params })
      .pipe(map((resp) => resp.results));
  }

  /**
   * Retrieves a movie by its ID.
   * @param movieId Identifier of the movie to retrieve.
   * @returns Observable that emits the movie corresponding to the ID or null if not found.
   */
  getMovieById(movieId: number): Observable<IMovieDetails | null> {
    const url = `${environment.MOVIES_ENDPOINT}/movie/${movieId}?api_key=${environment.MOVIES_API_KEY}`;
    return this.http
      .get<IMovieDetails>(url)
      .pipe(catchError(this.handleError<null>(null)));
    // const movie = [].find((item: any) => item.id === movieId) || null;
    // return of<IMovieDetails | null>(movie).pipe(delay(1000), catchError(this.handleError<null>(null)));
  }

  /**
   * Retrieves movies by genre excluding a specific movies by its IDs.
   * @param movieIds Identifier of the movies to exclude.
   * @param genres List of genres to filter the movies.
   * @returns Observable emitting the list of movies by genre excluding the specified movies, or an empty list in case of error.
   */
  getMoviesByGenre(
    movieIds: number[],
    genreId: number
  ): Observable<ReadonlyArray<IMovie>> {
    const currentYear = new Date().getFullYear();
    const url = `${environment.MOVIES_ENDPOINT}/discover/movie`;
    const params = new HttpParams()
      .set('api_key', environment.MOVIES_API_KEY)
      .set('with_genres', genreId)
      .set('primary_release_year', currentYear)
      .set('sort_by', 'popularity.desc')
      .set('page', 1);

    return this.http
      .get<ReadonlyArray<IMovie>>(url, { params })
      .pipe(catchError(this.handleError<ReadonlyArray<IMovie>>([])));
    // const movies = [].filter((movie: any) =>
    // 	genres.some((genre) => movie.title.includes(genre) && !movieIds.includes(movie.id))
    // );
    // return of<IMovie[]>(movies).pipe(delay(1000), catchError(this.handleError<IMovie[]>([])));
  }

  /**
   * Retrieves movies by genre excluding a specific movies by its IDs.
   * @param movieIds Identifier of the movies to exclude.
   * @param genres List of genres to filter the movies.
   * @returns Observable emitting the list of movies by genre excluding the specified movies, or an empty list in case of error.
   */
  getSimilarMovies(movieId: number): Observable<ReadonlyArray<IMovie>> {
    const url = `${environment.MOVIES_ENDPOINT}/movie/${movieId}/similar`;
    const params = new HttpParams()
      .set('api_key', environment.MOVIES_API_KEY)
      .set('language', 'en-US')
      .set('page', 1);

    return this.http.get<IMoviesResponse>(url, { params }).pipe(
      map((resp) => resp.results),
      catchError(this.handleError<ReadonlyArray<IMovie>>([]))
    );
    // const movies = [].filter((movie: any) =>
    // 	genres.some((genre) => movie.title.includes(genre) && !movieIds.includes(movie.id))
    // );
    // return of<IMovie[]>(movies).pipe(delay(1000), catchError(this.handleError<IMovie[]>([])));
  }

  /**
   * Retrieves movies based on a provided movie title.
   * @param movieTitle The title used to filter movies.
   * @returns Observable of movies filtered by the provided title or an empty list in case of error.
   */
  getMoviesByTitle(
    movieTitle: string,
    page: number
  ): Observable<ReadonlyArray<IMovie>> {
    const url = `${environment.MOVIES_ENDPOINT}/search/movie`;
    const params = new HttpParams()
      .set('api_key', environment.MOVIES_API_KEY)
      .set('language', 'en-US')
      .set('query', movieTitle)
      .set('sort_by', 'release_date.desc')
      .set('page', page);

    return this.http.get<IMoviesResponse>(url, { params }).pipe(
      map((resp) => resp.results),
      catchError(this.handleError<ReadonlyArray<IMovie>>([]))
    );
    // const movies = [].filter((movie: any) => movie.title.toLocaleLowerCase().includes(movieTitle.toLocaleLowerCase()));
    // return of<IMovie[]>(movies).pipe(delay(1000), catchError(this.handleError<IMovie[]>([])));
  }

  /**
   * Retrieves movies based on the provided list of movie IDs.
   * Filters movies from the moviesList based on the movie IDs provided and returns them as an observable.
   * @param movieIds An array of movie IDs used to filter the moviesList.
   * @returns An observable emitting movies filtered by the provided IDs
   * or an empty array in case of movieIds is empty or an error occurs.
   */
  getMoviesByWatchList(movieIds: number[]): Observable<ReadonlyArray<IMovie>> {
    if (!movieIds.length) return of([]);

    const requests = movieIds.map((movieId) => {
      const url = `${environment.MOVIES_ENDPOINT}/movie/${movieId}`;
      const params = new HttpParams()
        .set('api_key', environment.MOVIES_API_KEY)
        .set('language', 'en-US');

      return this.http.get<IMovie>(url, { params });
    });

    return forkJoin(requests).pipe(
      catchError(this.handleError<ReadonlyArray<IMovie>>([]))
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

  getFormatedMovieDuration(value: number): string {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    return `${hours}h ${minutes}m`;
  }
}
