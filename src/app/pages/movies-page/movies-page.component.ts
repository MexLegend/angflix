import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Signal,
  ViewChild,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { IMoviesState } from 'src/app/state/interfaces/movie.state';
import { IWatchlistState } from 'src/app/state/interfaces/watchlist.state';

import { ContainerComponent } from 'src/app/components/container/container.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { MoviesApiActions } from 'src/app/state/actions/movies.actions';
import { selectMovies } from 'src/app/state/selectors/movies.selectors';
import { selectWatchlist } from 'src/app/state/selectors/watchlist.selector';
import { CategorySectionComponent } from '../../components/category-section/category-section.component';
import { HeroComponent } from './components/hero/hero.component';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    CategorySectionComponent,
    ContainerComponent,
    LoaderComponent,
  ],
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss'],
})
export class MoviesPageComponent implements OnInit {
  @ViewChild('endMoviesSection', { read: ElementRef })
  endMoviesSectionRef?: ElementRef;

  private readonly _store: Store = inject(Store);

  moviesState: Signal<IMoviesState> = this._store.selectSignal(selectMovies);
  watchListState: Signal<IWatchlistState> =
    this._store.selectSignal(selectWatchlist);

  ngOnInit(): void {
    this._store.dispatch(MoviesApiActions.loadMovies());
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const endMoviesSection = this.endMoviesSectionRef?.nativeElement.offsetTop;

    if (window.innerHeight + window.scrollY >= endMoviesSection) {
      this._store.dispatch(MoviesApiActions.loadMovies());
    }
  }
}
