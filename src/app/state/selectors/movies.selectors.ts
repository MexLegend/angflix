import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMovie } from 'src/app/interfaces/movie';

const selectMoviesFeature = createFeatureSelector<ReadonlyArray<IMovie>>('movies');

export const selectMovies = createSelector(selectMoviesFeature, (state: ReadonlyArray<IMovie>) => state);
