import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { FilmsService } from '../../services/film.service';
import {
  FilmActionTypes,
  getNowPlaying, getNowPlayingFailure,
  getPopular, getNowPlayingSuccess, getPopularFailure,
  getPopularSuccess, geFilmDetails, geFilmDetailsFailure, geFilmDetailsSuccess
} from '../actions/film.actions';
import { Film } from 'src/app/models/film';


@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private filmService: FilmsService,
    private router: Router,
  ) {}

  NowPlaying$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FilmActionTypes.NOW_PLAYING),
      map((action: getNowPlaying) => action.payload),
      mergeMap(() => {
        return this.filmService.getFilmsNowPlaying().pipe(
          map((films) => new getNowPlayingSuccess(films)),
          catchError((error) => of(new getNowPlayingFailure({ error: error })))
        );
      })
    );
  });

  NowPlayingSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(FilmActionTypes.NOW_PLAYING_SUCCESS),
        tap(() => {
          this.router.navigateByUrl('/films');
        })
      );
    },
    { dispatch: false }
  );

  NowPlayingFailure$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(FilmActionTypes.NOW_PLAYING_FAILURE)
      );
    },
    { dispatch: false }
  );

  NowPopular$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FilmActionTypes.NOW_POPULAR),
      map((action: getPopular) => action.payload),
      mergeMap(() => {
        return this.filmService.getPopularFilms().pipe(
          map((films) => new getPopularSuccess(films)),
          catchError((error) => of(new getPopularFailure({ error: error })))
        );
      })
    );
  });

  NowPopularSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(FilmActionTypes.NOW_POPULAR_SUCCESS),
        tap(() => {
          this.router.navigateByUrl('/films');
        })
      );
    },
    { dispatch: false }
  );

  NowPopularFailure$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(FilmActionTypes.NOW_POPULAR_SUCCESS)
      );
    },
    { dispatch: false }
  );

  FilmDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FilmActionTypes.FILM_DETAILS),
      map((action: geFilmDetails) => action.payload),
      mergeMap((action) => {
        return this.filmService.getCastByFilmId(action.id).pipe(
          map((cast) => {
            return new geFilmDetailsSuccess(cast)
          }),
          catchError((error) => of(new getNowPlayingFailure({ error: error })))
        );
      })
    );
  });
  
  FilmDetailSSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(FilmActionTypes.FILM_DETAILS_SUCCESS)
      );
    },
    { dispatch: false }
  );


  FilmDetailSFailure$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(FilmActionTypes.FILM_DETAILS_FAILURE)
      );
    },
    { dispatch: false }
  );

}