import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Store } from '@ngrx/store';
import { WatchlistActions } from './state/actions/watchlist.actions';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, NavbarComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	private readonly _store: Store = inject(Store);

	/**
	 * Upon initializing the component, sets the initial watchlist state
	 */
	ngOnInit(): void {
		this._store.dispatch(WatchlistActions.loadWatchlist());
	}
}
