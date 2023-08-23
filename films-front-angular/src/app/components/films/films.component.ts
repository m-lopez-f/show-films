import { Component, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { Film } from 'src/app/models/film';
import { AppState, selectFilmState } from 'src/app/store/app.states';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  standalone: true,
  imports: [NgbCarouselModule, NgFor, FormsModule],
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent {
  filmsPopular$: Film[] | null = null;
  filmsNowPlaying$: Film[] | null = null;
  getFilmState: Observable<any>
  errorMessage = null;
  paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;
  
  constructor(private store: Store<AppState>) {
    this.getFilmState = this.store.select(selectFilmState);
  }

  ngOnInit(): void {
    this.getFilmState.subscribe((state) => {
      this.filmsPopular$ = state.filmsPopular;
      this.filmsNowPlaying$ = state.filmsNowPlaying;
      this.errorMessage = state.errorMessage;
    });
  }
}
