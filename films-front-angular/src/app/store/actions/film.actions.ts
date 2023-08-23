import { Action } from '@ngrx/store';


export enum FilmActionTypes {
  NOW_PLAYING = '[Film] Now Playing',
  NOW_PLAYING_SUCCESS = '[Film] Now Playing Success',
  NOW_PLAYING_FAILURE = '[Film] Now Playing Failure',
  NOW_POPULAR = '[Film] Popular',
  NOW_POPULAR_SUCCESS = '[Film] Popular Success',
  NOW_POPULAR_FAILURE = '[Film] Popular Failure',
  FILM_DETAILS = '[Film] Film details',
  FILM_DETAILS_SUCCESS = '[Film] Film details Success',
  FILM_DETAILS_FAILURE = '[Film] Film details Failure',
}

export class getPopular implements Action {
  readonly type = FilmActionTypes.NOW_POPULAR;
  constructor(public payload: any) {}
}

export class getPopularSuccess implements Action {
  readonly type = FilmActionTypes.NOW_POPULAR_SUCCESS;
  constructor(public payload: any) {}
}

export class getPopularFailure implements Action {
  readonly type = FilmActionTypes.NOW_POPULAR_FAILURE;
  constructor(public payload: any) {}
}

export class getNowPlaying implements Action {
  readonly type = FilmActionTypes.NOW_PLAYING;
  constructor(public payload: any) {}
}

export class getNowPlayingSuccess implements Action {
  readonly type = FilmActionTypes.NOW_PLAYING_SUCCESS;
  constructor(public payload: any) {}
}

export class getNowPlayingFailure implements Action {
  readonly type = FilmActionTypes.NOW_PLAYING_FAILURE;
  constructor(public payload: any) {}
}

export class getFilmDetails implements Action {
  readonly type = FilmActionTypes.FILM_DETAILS;
  constructor(public payload: any) {}
}

export class getFilmDetailsSuccess implements Action {
  readonly type = FilmActionTypes.FILM_DETAILS_SUCCESS;
  constructor(public payload: any) {}
}

export class getFilmDetailsFailure implements Action {
  readonly type = FilmActionTypes.FILM_DETAILS_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | getPopular
  | getPopularSuccess
  | getPopularFailure
  | getNowPlaying
  | getNowPlayingSuccess
  | getNowPlayingFailure
  | getFilmDetails
  | getFilmDetailsSuccess
  | getFilmDetailsFailure