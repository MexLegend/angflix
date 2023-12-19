import { IMovie } from 'src/app/interfaces/movie';

export interface IWatchlistState {
	watchlist: ReadonlyArray<IMovie>;
	loading: boolean;
	error: string | null;
}
