import { inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { MovieService } from 'src/app/services/movie.service';
import {
  MoviesApiActions,
  MoviesSearchActions,
} from '../actions/movies.actions';
import {
  selectCurrentPage,
  selectCurrentSearchPage,
} from '../selectors/movies.selectors';

export const loadMovies = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    movieService = inject(MovieService)
  ) => {
    return actions$.pipe(
      ofType(MoviesApiActions.loadMovies),
      concatLatestFrom(() => store.select(selectCurrentPage)),
      exhaustMap(([_, currentPage]) =>
        movieService.getMovies(currentPage).pipe(
          map((movies) => MoviesApiActions.loadMoviesSuccess({ movies })),
          catchError((error) =>
            of(
              MoviesApiActions.loadMoviesFailure({
                error: 'Error al cargar las películas.',
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const searchMovies = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    movieService = inject(MovieService)
  ) => {
    return actions$.pipe(
      ofType(MoviesSearchActions.searchMovies),
      concatLatestFrom(() => store.select(selectCurrentSearchPage)),
      exhaustMap(([{ movieTitle }, currentPage]) =>
        movieService.getMoviesByTitle(movieTitle, currentPage).pipe(
          map((movies) => MoviesSearchActions.searchMoviesSuccess({ movies })),
          catchError((error) =>
            of(
              MoviesSearchActions.searchMoviesFailure({
                error: 'Error al buscar las películas.',
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);
