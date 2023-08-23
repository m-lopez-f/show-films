import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilmsComponent } from './components/films/films.component';
import { FilmsDetailComponent } from './components/films-detail/films-detail.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { AuthGuardService } from './services/auth-gard-service';

const routes: Routes = [
  { path: 'films', component: FilmsComponent, canActivate: [AuthGuardService], children: [
    { path: 'film-detail/:id', component: FilmsDetailComponent }
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: LandingComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
