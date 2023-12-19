import { ActionReducerMap } from '@ngrx/store';
import { IMovie } from 'src/app/interfaces/movie';
import { moviesReducer } from './movies.reducer';
import { watchListReducer } from './watchList.reducer';
import { MoviesState } from '../interfaces/movie.state';

export interface IAppState {
	movies: MoviesState;
	watchlist: ReadonlyArray<IMovie>;
}

export const appReducers: ActionReducerMap<IAppState> = {
	movies: moviesReducer,
	watchlist: watchListReducer
};
