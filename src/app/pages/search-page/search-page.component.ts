import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Signal,
  ViewChild,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CategorySectionComponent } from 'src/app/components/category-section/category-section.component';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { NoResultsFoundMessageComponent } from 'src/app/components/no-results-found-message/no-results-found-message.component';
import { MoviesSearchActions } from 'src/app/state/actions/movies.actions';
import { IMoviesSearchState } from 'src/app/state/interfaces/movie.state';
import { selectMoviesSearch } from 'src/app/state/selectors/movies.selectors';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    CategorySectionComponent,
    NoResultsFoundMessageComponent,
    LoaderComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  @ViewChild('endMoviesSection', { read: ElementRef })
  endMoviesSectionRef?: ElementRef;

  private readonly _store: Store = inject(Store);

  routerParamsSub$?: Subscription;
  searchMovieLabel: WritableSignal<string> = signal('');
  moviesState: Signal<IMoviesSearchState> =
    this._store.selectSignal(selectMoviesSearch);

  private readonly _route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
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
    this.routerParamsSub$ = this._route.queryParams.subscribe((params) => {
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this._store.dispatch(MoviesSearchActions.resetSearchMovies());
    this._store.dispatch(MoviesSearchActions.searchMovies({ movieTitle }));
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const endMoviesSection = this.endMoviesSectionRef?.nativeElement.offsetTop;

    if (window.innerHeight + window.scrollY >= endMoviesSection) {
      this._store.dispatch(
        MoviesSearchActions.searchMovies({
          movieTitle: this.moviesState().movieTitle,
        })
      );
    }
  }
}
