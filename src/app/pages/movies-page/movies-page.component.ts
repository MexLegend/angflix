import { Component, OnInit, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { IMovie } from 'src/app/interfaces/movie';

import { CategorySectionComponent } from '../../components/category-section/category-section.component';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { HeroComponent } from './components/hero/hero.component';
import { MoviesApiActions } from 'src/app/state/actions/movies.actions';
import { selectMovies } from 'src/app/state/selectors/movies.selectors';
import { selectWatchlist } from 'src/app/state/selectors/watchlist.selector';
import { MoviesState } from 'src/app/state/interfaces/movie.state';

@Component({
	selector: 'app-movies-page',
	standalone: true,
	imports: [CommonModule, HeroComponent, CategorySectionComponent, ContainerComponent],
	templateUrl: './movies-page.component.html',
	styleUrls: ['./movies-page.component.scss']
})
export class MoviesPageComponent implements OnInit {
	private readonly _store: Store = inject(Store);

	moviesState: Signal<MoviesState> = this._store.selectSignal(selectMovies);
	watchList: Signal<ReadonlyArray<IMovie>> = this._store.selectSignal(selectWatchlist);

	ngOnInit(): void {
		this._store.dispatch(MoviesApiActions.loadMovies());
	}
}
