import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { CategorySectionComponent } from 'src/app/components/category-section/category-section.component';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/interfaces/movie';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmptyMoviesListMessageComponent } from 'src/app/components/empty-movies-list-message/empty-movies-list-message.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, ContainerComponent, CategorySectionComponent, EmptyMoviesListMessageComponent],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent {
  routerParamsSub$?: Subscription;
  searchMovieLabel: WritableSignal<string> = signal('');
  movies: WritableSignal<Movie[]> = signal([]);

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {
    this.getMovieTitleFromQueryParams();
  }

  ngOnDestroy(): void {
    this.routerParamsSub$?.unsubscribe();
  }

  /**
   * Subscribes to query params changes and retrieves the movie title from the 'search' query param.
   * Calls a method to format the movie title and fetch movies based on the formatted title.
   */
  getMovieTitleFromQueryParams() {
    this.routerParamsSub$ = this.route.queryParams.subscribe((params) => {
      const searchMovieTitle = params['search'];
      const searchMovieTitleFormatted =
        this.formatSearchMovieTitle(searchMovieTitle);
      this.searchMovieLabel.set(`Results for "${searchMovieTitle}"`);
      this.getMoviesByTitle(searchMovieTitleFormatted);
    });
  }

  formatSearchMovieTitle(searchMovieTitle: string): string {
    return searchMovieTitle.trim().replace(/\s+/g, ' ');
  }

  getMoviesByTitle(movieTitle: string) {
    const getMoviesByTitleSub$ = this.movieService
      .getMoviesByTitle(movieTitle)
      .subscribe((movies) => {
        this.movies.set(movies);
        setTimeout(() => getMoviesByTitleSub$.unsubscribe(), 100);
      });
  }
}
