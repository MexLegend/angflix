import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { MoviesApiActions, MoviesSearchActions } from '../actions/movies.actions';
import { MovieService } from 'src/app/services/movie.service';

export const loadMovies = createEffect(
	(actions$ = inject(Actions), movieService = inject(MovieService)) => {
		return actions$.pipe(
			ofType(MoviesApiActions.loadMovies),
			mergeMap(() =>
				movieService.getMovies().pipe(
					map((movies) => MoviesApiActions.loadMoviesSuccess({ movies })),
					catchError((error) => of(MoviesApiActions.loadMoviesFailure({ error: 'Error al cargar las películas.' })))
				)
			)
		);
	},
	{ functional: true }
);

export const searchMovies = createEffect(
	(actions$ = inject(Actions), movieService = inject(MovieService)) => {
		return actions$.pipe(
			ofType(MoviesSearchActions.searchMovies),
			mergeMap(({ movieTitle }) =>
				movieService.getMoviesByTitle(movieTitle).pipe(
					map((movies) => MoviesSearchActions.searchMoviesSuccess({ movies })),
					catchError((error) => of(MoviesSearchActions.searchMoviesFailure({ error: 'Error al buscar las películas.' })))
				)
			)
		);
	},
	{ functional: true }
);