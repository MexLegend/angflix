import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IMovie } from 'src/app/interfaces/movie';

export const MoviesActions = createActionGroup({
  source: 'Movies',
  events: {
    'Add Movie': props<{ movieId: string }>(),
    'Remove Movie': props<{ movieId: string }>(),
  },
});

export const MoviesSearchActions = createActionGroup({
  source: 'Movies Search',
  events: {
    'Search Movies': props<{ movieTitle: string }>(),
    'Search Movies Success': props<{ movies: ReadonlyArray<IMovie> }>(),
    'Search Movies Failure': props<{ error: string }>(),
    'Reset Search Movies': emptyProps(),
  },
});

export const MoviesApiActions = createActionGroup({
  source: 'Movies API',
  events: {
    'Load Movies': emptyProps(),
    'Load Movies Success': props<{ movies: ReadonlyArray<IMovie> }>(),
    'Load Movies Failure': props<{ error: string }>(),
  },
});
