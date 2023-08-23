import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
  SignUp, SignUpSuccess, SignUpFailure,
  LogOut,
} from '../actions/auth.actions';


@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  LogIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN),
      map((action: LogIn) => action.payload),
      mergeMap(({ email, password }) => {
        return this.authService.logIn(email, password).pipe(
          map((user) => new LogInSuccess({token: user.token, email: email})),
          catchError((error) => of(new LogInFailure({ error: error })))
        );
      })
    );
  });

  LogInSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((user: any) => {
          localStorage.setItem('token', user.payload.token);
        this.router.navigateByUrl('/');
        })
      );
    },
    { dispatch: false }
  );

  LogInFailure$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE)
      );
    },
    { dispatch: false }
  );

  LogOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap(() => {
          localStorage.removeItem('token');
        })
      );
    },
    { dispatch: false }
  );

  SignUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActionTypes.SIGNUP),
      map((action: SignUp) => action.payload),
      switchMap((payload: any) => {
        return this.authService.signUp(payload.email, payload.password, payload.name, payload.lastname, payload.birthday).pipe(
          map((user) => new SignUpSuccess({token: user.token, email: payload.email})),
          catchError((error) => of(new SignUpFailure({ error: error })))
        )}
      )
    );
  });

  SignUpSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActionTypes.SIGNUP_SUCCESS),
        tap((user: any) => {
          localStorage.setItem('token', user.payload.token);
          this.router.navigateByUrl('/');
        })
      );
    },
    { dispatch: false }
  );

  SignUpFailure$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActionTypes.SIGNUP_FAILURE)
      );
    },
    { dispatch: false }
  );
}