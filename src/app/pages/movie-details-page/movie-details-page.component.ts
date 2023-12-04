import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { MovieTrailerComponent } from 'src/app/components/movie-trailer/movie-trailer.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from 'src/app/interfaces/movie';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { CategorySectionComponent } from 'src/app/components/category-section/category-section.component';

@Component({
  selector: 'app-movie-details-page',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    MovieTrailerComponent,
    MovieDetailsComponent,
    CategorySectionComponent,
  ],
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.scss'],
})
export class MovieDetailsPageComponent {
  routerParamsSub$?: Subscription;
  movie: WritableSignal<Movie | null> = signal(null);
  genreRelatedMovies: WritableSignal<Movie[]> = signal([]);

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {
    this.getMovieIdFromParams();
  }

  ngOnDestroy(): void {
    this.routerParamsSub$?.unsubscribe();
  }

  /**
   * Retrieves the movie ID from the route parameters.
   * Uses the obtained ID to fetch the movie details.
   */
  getMovieIdFromParams() {
    this.routerParamsSub$ = this.route.params.subscribe((params) => {
      const id = params['id'];
      this.getMovieById(id);
    });
  }

  /**
   * Fetches data of a single movie from the MovieService using its ID
   */
  getMovieById = (movieId: string) => {
    // Define a subscription to retrieve movie data
    const getMovieByIdSub$ = this.movieService
      .getMovieById(movieId)
      .subscribe((movieReponse) => {
        if (movieReponse) {
          // Set the'movie' value with the "movieReponse" using WritableSignal's set method
          this.movie.set(movieReponse);
          // Get a list of movies that matches any of the "movieReponse" genres
          this.getMoviesByGenre(movieReponse.id, movieReponse.genre || []);
        } else {
          console.log('Movie not found');
        }
        // Unsubscribe from the subscription after a delay of 100 milliseconds to avoid 'ReferenceError'
        setTimeout(() => getMovieByIdSub$.unsubscribe(), 100);
      });
  };

  /**
   * Fetches movies related to a specific genre based on provided movie ID and genre array.
   * Uses the movie service to retrieve movies related to the given genre and provided movie ID.
   * Sets the obtained genre-related movies in the 'genreRelatedMovies' property.
   * Unsubscribes from the subscription after a short delay to prevent 'ReferenceError'
   * @param movieId The ID of the movie used to filter related movies by genre.
   * @param genres An array of genres used to filter movies.
   */
  getMoviesByGenre(movieId: string, genres: string[]) {
    const getMoviesByGenreSub$ = this.movieService
      .getMoviesByGenre([movieId], genres)
      .subscribe((genreRelatedMoviesResponse) => {
        this.genreRelatedMovies.set(genreRelatedMoviesResponse);
        setTimeout(() => getMoviesByGenreSub$.unsubscribe(), 100);
      });
  }
}
