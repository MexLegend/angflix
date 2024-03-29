import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategorySectionComponent } from 'src/app/components/category-section/category-section.component';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { MovieTrailerComponent } from 'src/app/components/movie-trailer/movie-trailer.component';
import { NoResultsFoundMessageComponent } from 'src/app/components/no-results-found-message/no-results-found-message.component';
import { IGenre, IMovie, IMovieDetails } from 'src/app/interfaces/movie';
import { MovieService } from '../../services/movie.service';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

@Component({
  selector: 'app-movie-details-page',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    MovieTrailerComponent,
    MovieDetailsComponent,
    CategorySectionComponent,
    NoResultsFoundMessageComponent,
  ],
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.scss'],
})
export class MovieDetailsPageComponent implements OnInit, OnDestroy {
  routerParamsSub$?: Subscription;
  isLoading: WritableSignal<boolean> = signal(true);
  movie: WritableSignal<IMovieDetails | null> = signal(null);
  genreRelatedMovies: WritableSignal<ReadonlyArray<IMovie>> = signal([]);

  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _movieService: MovieService = inject(MovieService);

  ngOnInit(): void {
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
    this.routerParamsSub$ = this._route.params.subscribe((params) => {
      const id = params['id'];
      this.getMovieById(Number(id));
    });
  }

  /**
   * Fetches data of a single movie from the MovieService using its ID
   */
  getMovieById = (movieId: number) => {
    // Define a subscription to retrieve movie data
    const getMovieByIdSub$ = this._movieService
      .getMovieById(movieId)
      .subscribe((movieReponse) => {
        if (movieReponse) {
          // Set the'movie' value with the "movieReponse" using WritableSignal's set method
          this.movie.set(movieReponse);
          // Get a list of similar movies from the current movie
          this.getSimilarMovies(movieReponse.id, movieReponse.genres);
        } else {
          console.log('Movie not found');
        }
        this.isLoading.set(false);
        getMovieByIdSub$.unsubscribe();
      });
  };

  /**
   * Fetches movies related to a movie ID.
   * Uses the movie service to retrieve movies related to the given movie ID.
   * Sets the obtained genre-related movies in the 'genreRelatedMovies' property.
   * Unsubscribes from the subscription to prevent memory leaks
   * @param movieId The ID of the movie used to get the related movies.
   */
  getSimilarMovies(movieId: number, genres: IGenre[]) {
    const genresIds = genres.map((item) => item.id);
    const getSimilarMoviesSub$ = this._movieService
      .getSimilarMovies(movieId)
      .subscribe((genreRelatedMoviesResponse) => {
        this.genreRelatedMovies.set(genreRelatedMoviesResponse);
        getSimilarMoviesSub$.unsubscribe();
      });
  }
}
