import { ActionReducerMap } from '@ngrx/store';
import { moviesReducer } from './movies.reducer';
import { watchlistReducer } from './watchList.reducer';
import { IMoviesState } from '../interfaces/movie.state';
import { IWatchlistState } from '../interfaces/watchlist.state';

export interface IAppState {
	movies: IMoviesState;
	watchlist: IWatchlistState;
}

export const appReducers: ActionReducerMap<IAppState> = {
	movies: moviesReducer,
	watchlist: watchlistReducer
};
