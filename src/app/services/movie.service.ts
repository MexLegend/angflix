import { Injectable, inject } from '@angular/core';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { IMovie, IMovieDetails, IMoviesResponse } from '../interfaces/movie';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class MovieService {
	private readonly http: HttpClient = inject(HttpClient);

	/**
	 * Retrieves a list of movies after 1 second.
	 * @returns Observable emitting the list of movies or an empty list in case of error.
	 */
	getMovies(): Observable<ReadonlyArray<IMovie>> {
		const currentYear = new Date().getFullYear();
		const url = `${environment.MOVIES_ENDPOINT}/discover/movie?api_key=${environment.MOVIES_API_KEY}&primary_release_year=${currentYear}&sort_by=popularity.desc&page=1`;
		return this.http.get<IMoviesResponse>(url).pipe(map((resp) => resp.results));
		// return of<IMovie[]>(moviesList).pipe(delay(1000), catchError(this.handleError<IMovie[]>([])));
	}

	/**
	 * Retrieves a movie by its ID after 1 second.
	 * @param movieId Identifier of the movie to retrieve.
	 * @returns Observable that emits the movie corresponding to the ID or null if not found.
	 */
	getMovieById(movieId: number): Observable<IMovieDetails | null> {
		const movie = [].find((item: any) => item.id === movieId) || null;
		return of<IMovieDetails | null>(movie).pipe(delay(1000), catchError(this.handleError<null>(null)));
	}

	/**
	 * Retrieves movies by genre excluding a specific movies by its IDs.
	 * @param movieIds Identifier of the movies to exclude.
	 * @param genres List of genres to filter the movies.
	 * @returns Observable emitting the list of movies by genre excluding the specified movies, or an empty list in case of error.
	 */
	getMoviesByGenre(movieIds: number[], genres: string[]): Observable<IMovie[]> {
		const movies = [].filter((movie: any) =>
			genres.some((genre) => movie.title.includes(genre) && !movieIds.includes(movie.id))
		);
		return of<IMovie[]>(movies).pipe(delay(1000), catchError(this.handleError<IMovie[]>([])));
	}

	/**
	 * Retrieves movies based on a provided movie title.
	 * @param movieTitle The title used to filter movies.
	 * @returns Observable of movies filtered by the provided title or an empty list in case of error.
	 */
	getMoviesByTitle(movieTitle: string): Observable<IMovie[]> {
		const movies = [].filter((movie: any) => movie.title.toLocaleLowerCase().includes(movieTitle.toLocaleLowerCase()));
		return of<IMovie[]>(movies).pipe(delay(1000), catchError(this.handleError<IMovie[]>([])));
	}

	/**
	 * Retrieves movies based on the provided list of movie IDs.
	 * Filters movies from the moviesList based on the movie IDs provided and returns them as an observable.
	 * @param movieIds An array of movie IDs used to filter the moviesList.
	 * @returns An observable emitting movies filtered by the provided IDs or an empty array in case of an error.
	 */
	getMoviesByWatchList(movieIds: number[]): Observable<IMovie[]> {
		const watchListMovies = [].filter((movie: any) => movieIds.some((watchListMovie) => watchListMovie === movie.id));
		return of<IMovie[]>(watchListMovies).pipe(delay(1000), catchError(this.handleError<IMovie[]>([])));
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
	getMovieRating(movie: IMovie): number {
		return movie.vote_average / 2;
	}
}
