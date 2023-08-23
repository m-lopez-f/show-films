import { Cast } from 'src/app/models/cast';
import { Film } from '../../models/film';
import { FilmActionTypes, All } from '../actions/film.actions';

export interface State {
  filmsPopular: Film[] | null;
  filmsNowPlaying: Film[] | null;
  filmDetail: Film | null;
  filmCast: Cast[] | null;
  errorMessage: string | null;
}

export const initialState: State = {
  filmsPopular: null,
  filmsNowPlaying: null,
  filmDetail: null,
  filmCast: null,
  errorMessage: null
};

export function reducer(state: State = initialState, action: any): State {
  switch (action.type) {
    case FilmActionTypes.NOW_PLAYING_SUCCESS: {
      return {
        ...state,
        filmsNowPlaying: action.payload,
        errorMessage: null
      };
    }
    case FilmActionTypes.NOW_PLAYING_FAILURE: {
      return {
        ...state,
        errorMessage: 'Error to get resources.'
      };
    }
    case FilmActionTypes.NOW_POPULAR_FAILURE: {
      return {
        ...state,
        errorMessage: 'Error to get resources.'
      };
    }
    case FilmActionTypes.NOW_POPULAR_SUCCESS: {
      return {
        ...state,
        filmsPopular: action.payload,
        errorMessage: null
      };
    }
    case FilmActionTypes.FILM_DETAILS_FAILURE: {
      return {
        ...state,
        errorMessage: 'Error to get resources.'
      };
    }
    case FilmActionTypes.FILM_DETAILS_SUCCESS: {
      return {
        ...state,
        filmDetail: action.payload.film,
        filmCast: action.payload.casts,
        errorMessage: null
      };
    }
    default: {
      return state;
    }
  }
}