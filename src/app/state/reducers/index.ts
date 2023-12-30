import { ActionReducerMap } from '@ngrx/store';
import { moviesReducer, moviesSearchReducer } from './movies.reducer';
import { watchlistReducer } from './watchList.reducer';
import { IMoviesSearchState, IMoviesState } from '../interfaces/movie.state';
import { IWatchlistState } from '../interfaces/watchlist.state';

export interface IAppState {
	movies: IMoviesState;
	moviesSearch: IMoviesSearchState;
	watchlist: IWatchlistState;
}

export const appReducers: ActionReducerMap<IAppState> = {
	movies: moviesReducer,
	moviesSearch: moviesSearchReducer,
	watchlist: watchlistReducer
};
