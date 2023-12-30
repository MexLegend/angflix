import { Component, OnDestroy, OnInit, Signal, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { CategorySectionComponent } from 'src/app/components/category-section/category-section.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NoResultsFoundMessageComponent } from 'src/app/components/no-results-found-message/no-results-found-message.component';
import { selectMoviesSearch } from 'src/app/state/selectors/movies.selectors';
import { Store } from '@ngrx/store';
import { IMoviesSearchState } from 'src/app/state/interfaces/movie.state';
import { MoviesSearchActions } from 'src/app/state/actions/movies.actions';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@Component({
	selector: 'app-search-page',
	standalone: true,
	imports: [CommonModule, ContainerComponent, CategorySectionComponent, NoResultsFoundMessageComponent, LoaderComponent],
	templateUrl: './search-page.component.html',
	styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy {
	private readonly _store: Store = inject(Store);

	routerParamsSub$?: Subscription;
	searchMovieLabel: WritableSignal<string> = signal('');
	moviesState: Signal<IMoviesSearchState> = this._store.selectSignal(selectMoviesSearch);

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
			const searchMovieTitleFormatted = this.formatSearchMovieTitle(searchMovieTitle);
			this.searchMovieLabel.set(`Results for "${searchMovieTitle}"`);
			this.getMoviesByTitle(searchMovieTitleFormatted);
		});
	}

	formatSearchMovieTitle(searchMovieTitle: string): string {
		return searchMovieTitle.trim().replace(/\s+/g, ' ');
	}

	getMoviesByTitle(movieTitle: string) {
		this._store.dispatch(MoviesSearchActions.searchMovies({ movieTitle }));
	}
}
