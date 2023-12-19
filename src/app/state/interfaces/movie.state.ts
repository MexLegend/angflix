import { IMovie } from "src/app/interfaces/movie";

export interface IMoviesState {
	movies: ReadonlyArray<IMovie>;
	loading: boolean;
	error: string | null;
}