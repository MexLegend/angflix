import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IMovie } from 'src/app/interfaces/movie';

export const WatchlistActions = createActionGroup({
	source: 'Watchlist',
	events: {
		'Load Watchlist': emptyProps(),
		'Load Watchlist Success': props<{ watchlist: ReadonlyArray<IMovie> }>(),
		'Load Watchlist Failure': props<{ error: string }>(),
		'Toogle Watchlist': props<{ addToWatchlist: boolean; movie: IMovie }>()
	}
});
