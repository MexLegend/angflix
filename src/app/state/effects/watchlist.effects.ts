import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { WatchlistActions } from '../actions/watchlist.actions';
import { WatchlistService } from 'src/app/services/watchlist.service';
import { MovieService } from 'src/app/services/movie.service';

export const loadWatchlist = createEffect(
	(actions$ = inject(Actions), watchlistService = inject(WatchlistService), movieService = inject(MovieService)) => {
		const localStorageWatchList = watchlistService.getStorageWatchList();

		return actions$.pipe(
			ofType(WatchlistActions.loadWatchlist),
			mergeMap(() =>
				movieService.getMoviesByWatchList(localStorageWatchList).pipe(
					map((watchlist) => WatchlistActions.loadWatchlistSuccess({ watchlist })),
					catchError((error) => of(WatchlistActions.loadWatchlistFailure({ error: 'Error al cargar la watchlist.' })))
				)
			)
		);
	},
	{ functional: true }
);
