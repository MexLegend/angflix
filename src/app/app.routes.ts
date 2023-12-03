import { Routes } from '@angular/router';
import { MoviesPageComponent } from './pages/movies-page/movies-page.component';
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';
import { WatchlistPageComponent } from './pages/watchlist-page/watchlist-page.component';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "movies"
    },
    {
        path: "movie/:id",
        component: MovieDetailsPageComponent
    },
    {
        path: "movies",
        component: MoviesPageComponent
    },
    {
        path: "watchlist",
        component: WatchlistPageComponent
    },
];
