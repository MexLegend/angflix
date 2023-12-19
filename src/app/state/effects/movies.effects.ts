import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { MoviesApiActions } from '../actions/movies.actions';
import { MovieService } from 'src/app/services/movie.service';

@Injectable()
export class MovieEffects {
	private readonly _actions$: Actions = inject(Actions);
	private readonly _movieService: MovieService = inject(MovieService);

	loadMovies$ = createEffect(() =>
		this._actions$.pipe(
			ofType(MoviesApiActions.loadMovies),
			mergeMap(() =>
				this._movieService.getMovies().pipe(
					map((movies) => MoviesApiActions.loadMoviesSuccess({ movies })),
					catchError((error) => of(MoviesApiActions.loadMoviesFailure({ error: 'Error al cargar las películas.' })))
				)
			)
		)
	);
}
