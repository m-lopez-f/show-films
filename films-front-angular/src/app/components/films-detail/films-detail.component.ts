import { Component, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { Film } from 'src/app/models/film';
import { AppState, selectFilmState } from 'src/app/store/app.states';
import { Cast } from 'src/app/models/cast';
import { getFilmDetails } from 'src/app/store/actions/film.actions';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-films',
  templateUrl: './films-detail.component.html',
  standalone: true,
  imports: [NgbCarouselModule, NgFor, FormsModule],
})
export class FilmsDetailComponent {

  filmDetail$: Film | null = null;
  filmCast$: Cast[] | null = null;
  getFilmState: Observable<any>
  errorMessage = null;
  paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;
  filmId : number = 0;
  
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.getFilmState = this.store.select(selectFilmState);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.filmId = Number(params.get('id')) || 0;
      if (this.filmId) {
        this.store.dispatch(new getFilmDetails(this.filmId));
      }
    });
    
    this.getFilmState.subscribe((state) => {
      this.filmDetail$ = state.filmDetail;
      this.filmCast$ = state.filmCast;
      this.errorMessage = state.errorMessage;
    });
  }

}
