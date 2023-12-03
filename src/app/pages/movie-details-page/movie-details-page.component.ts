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

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {
    this.getMovieIdFromParams();
  }

  ngOnDestroy(): void {
    this.routerParamsSub$?.unsubscribe();
  }

  getMovieIdFromParams() {
    this.routerParamsSub$ = this.route.params.subscribe((params) => {
      const id = params['id'];
      this.getMovieById(id);
    });
  }

  /**
   * Fetches the data of a single movie from the MovieService using its ID
   */
  getMovieById = (movieId: string) => {
    // Define a subscription to retrieve movie data
    const getMovieByIdSub$ = this.movieService
      .getMovieById(movieId)
      .subscribe((movie) => {
        // Set the received movie data to the 'movie' property using WritableSignal's set method
        this.movie.set(movie);
        // Unsubscribe from the subscription after a delay of 100 milliseconds to avoid 'ReferenceError'
        setTimeout(() => getMovieByIdSub$.unsubscribe(), 100);
      });
  };

  getMoviesByGenre(genres: string[]){
    
  }
}
