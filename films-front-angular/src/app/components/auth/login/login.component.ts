import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../../../models/user';
import { AppState, selectAuthState } from '../../../store/app.states';
import { LogIn } from '../../../store/actions/auth.actions';


@Component({
  selector: 'app-log-in',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  user: User = {};
  getState: Observable<any>;
  errorMessage: string | null = '';

  constructor(
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new LogIn(payload));
  }

}