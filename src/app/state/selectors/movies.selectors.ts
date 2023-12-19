import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MoviesState } from '../interfaces/movie.state';

const selectMoviesFeature = createFeatureSelector<MoviesState>('movies');

export const selectMovies = createSelector(selectMoviesFeature, (state: MoviesState) => state);
