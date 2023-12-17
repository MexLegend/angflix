import { ActionReducerMap } from '@ngrx/store';
import { IMovie } from 'src/app/interfaces/movie';
import { moviesReducer } from './movies.reducer';
import { watchListReducer } from './watchList.reducer';

export interface IAppState {
	movies: ReadonlyArray<IMovie>;
	watchlist: ReadonlyArray<IMovie>;
}

export const appReducers: ActionReducerMap<IAppState> = {
	movies: moviesReducer,
	watchlist: watchListReducer
};
