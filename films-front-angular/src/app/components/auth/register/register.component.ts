import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../../../models/user';
import { AppState, selectAuthState } from '../../../store/app.states';
import { SignUp } from '../../../store/actions/auth.actions';


@Component({
  selector: 'app-sign-up',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

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
    this.store.dispatch(new SignUp(payload));
  }

}