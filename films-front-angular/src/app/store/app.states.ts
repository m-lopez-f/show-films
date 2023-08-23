import { createFeatureSelector } from '@ngrx/store';

import * as auth from './reducers/auth.reducers';
import * as film from './reducers/film.reducers';


export interface AppState {
  authState: auth.State;
  film: film.State
}

export const reducers = {
  auth: auth.reducer,
  film: film.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectFilmState = createFeatureSelector<AppState>('film');