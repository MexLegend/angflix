import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { Movie } from 'src/app/interfaces/movie';
import { CategorySectionComponent } from '../../components/category-section/category-section.component';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { HeroComponent } from './components/hero/hero.component';

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

  constructor(private movieService: MovieService) {
    this.getMovies();
  }

  /**
   * Fetches movies data from the MovieService.
   */
  getMovies = () => {
    // Define a subscription to retrieve movies data
    const getMoviesSub$ = this.movieService.getMovies().subscribe((movies) => {
      // Set the received movies data to the 'movies' property using WritableSignal's set method
      this.movies.set(movies);
      // Unsubscribe from the subscription after a delay of 100 milliseconds to avoid 'ReferenceError'
      setTimeout(() => getMoviesSub$.unsubscribe(), 100);
    });
  };
}
