import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { CategorySectionComponent } from 'src/app/components/category-section/category-section.component';
import { NoResultsFoundMessageComponent } from 'src/app/components/no-results-found-message/no-results-found-message.component';
import { Store } from '@ngrx/store';
import { selectWatchlist } from 'src/app/state/selectors/watchlist.selector';
import { IWatchlistState } from 'src/app/state/interfaces/watchlist.state';

@Component({
	selector: 'app-watchlist-page',
	standalone: true,
	imports: [CommonModule, ContainerComponent, CategorySectionComponent, NoResultsFoundMessageComponent],
	templateUrl: './watchlist-page.component.html',
	styleUrls: ['./watchlist-page.component.scss']
})
export class WatchlistPageComponent {
	private readonly _store: Store = inject(Store);

	watchListState: Signal<IWatchlistState> = this._store.selectSignal(selectWatchlist);
}
