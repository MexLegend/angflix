import { IMovie } from "src/app/interfaces/movie";

export interface MoviesState {
	movies: ReadonlyArray<IMovie>;
	loading: boolean;
	error: string | null;
}
