import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { appReducers } from './state/reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import * as moviesEffects from './state/effects/movies.effects';
import * as watchlistEffects from './state/effects/watchlist.effects';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideHttpClient(),
		provideStore(appReducers),
		provideEffects([watchlistEffects, moviesEffects]),
		provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), connectInZone: true })
	]
};
