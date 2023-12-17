import { createActionGroup, props } from '@ngrx/store';
import { IMovie } from 'src/app/interfaces/movie';

export const MoviesActions = createActionGroup({
	source: 'Movies',
	events: {
		'Add Movie': props<{ movieId: string }>(),
		'Remove Movie': props<{ movieId: string }>()
	}
});

export const WatchlistActions = createActionGroup({
	source: 'Watchlist',
	events: {
		Watchlist: props<{ watchList: ReadonlyArray<IMovie> }>(),
		'Toogle Watchlist': props<{ addToWatchlist: boolean; movie: IMovie }>(),
		'Is Movie In Watchlist': props<{ movieId: string }>()
	}
});

export const MoviesApiActions = createActionGroup({
	source: 'Movies API',
	events: {
		'Movie List': props<{ movies: ReadonlyArray<IMovie> }>()
	}
});
