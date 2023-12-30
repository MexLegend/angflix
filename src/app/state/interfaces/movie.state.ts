import { IMovie } from "src/app/interfaces/movie";

export interface IMoviesState {
	movies: ReadonlyArray<IMovie>;
	loading: boolean;
	error: string | null;
}

export interface IMoviesSearchState {
	movieTitle: string;
	movies: ReadonlyArray<IMovie>;
	loading: boolean;
	error: string | null;
}