import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pluck } from 'rxjs';
import { Film } from '../models/film';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  private apiUrl: string = '/api';
  private selectedFilm: Film | undefined;


  constructor(private http: HttpClient) {}
  getFilmsNowPlaying(): Observable<Film[]> {
    return this.http.get(this.apiUrl + '/nowPlaying')
      .pipe(
        pluck('results')
      ) as Observable<Film[]>;
  }

  getPopularFilms(): Observable<Film[]> {
    return this.http.get(this.apiUrl + '/popular')
      .pipe(
        pluck('results')
      ) as Observable<Film[]>;
  }

  getCastByFilmId(filmId: number): Observable<any[]> {
    return this.http.get(this.apiUrl + `/${filmId}/credits`).pipe(pluck('cast')) as Observable<any[]>;
  }

  setSelectedFilm(selectedFilm: Film): void {
    this.selectedFilm = selectedFilm;
  }

  getSelectedFilm(filmId: number): Film | undefined {
    return this.selectedFilm;
  }
}
