import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { MovieService } from 'src/app/services/movie.service';
import { WatchlistService } from 'src/app/services/watchlist.service';
import { WatchlistActions } from '../actions/watchlist.actions';

export const loadWatchlist = createEffect(
  (
    actions$ = inject(Actions),
    watchlistService = inject(WatchlistService),
    movieService = inject(MovieService)
  ) => {
    const localStorageWatchList = watchlistService.getStorageWatchList();

    return actions$.pipe(
      ofType(WatchlistActions.loadWatchlist),
      exhaustMap(() =>
        movieService.getMoviesByWatchList(localStorageWatchList).pipe(
          map((watchlist) =>
            WatchlistActions.loadWatchlistSuccess({ watchlist })
          ),
          catchError((error) =>
            of(
              WatchlistActions.loadWatchlistFailure({
                error: 'Error al cargar la watchlist.',
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);
