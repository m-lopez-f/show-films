import { defineStore } from 'pinia';

import fetchApi from '@/helpers/fetchApi';

const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/films`;

export const useFilmsStore = defineStore({
    id: 'films',
    state: () => ({
        films: JSON.parse(localStorage.getItem('films')),
        film: JSON.parse(localStorage.getItem('film')) || '',
        popularFilms: JSON.parse(localStorage.getItem('popularFilms')),
        filmCredits: JSON.parse(localStorage.getItem('filmCredits'))
    }),
    actions: {
        async getAllNowPlaying() {
            this.films = { loading: true };
            fetchApi.get(`${baseUrl}/nowPlaying`)
                .then(films => {
                    this.films = films.data.results
                    localStorage.setItem('films', JSON.stringify(this.films));
                })
                .catch(error => this.films = { error })
        },
        async getAllPopulars() {
            this.popularFilms = { loading: true };
            fetchApi.get(`${baseUrl}/popular`)
                .then(films => {
                    this.popularFilms = films.data.results
                    localStorage.setItem('popularFilms', JSON.stringify(this.popularFilms));
                })
                .catch(error => this.popularFilms = { error })
        },
        async filmGetCredits(filmID) {
            this.filmCredits = { loading: true };
            this.film = { loading: true };
            fetchApi.get(`${baseUrl}/${filmID}`)
                .then(filmCredits => {
                    const filmId = filmCredits.data.id
                    const films = JSON.parse(localStorage.getItem('films'))
                    this.film = films.find((f) => {
                        return f.id === filmId
                    })
                    if (!this.film) {
                        const popularFilms = JSON.parse(localStorage.getItem('popularFilms'))
                        this.film = popularFilms.find((f) => f.id === filmId)
                    }
                    this.filmCredits = filmCredits.data
                    localStorage.setItem('filmCredits', JSON.stringify(this.filmCredits));
                    localStorage.setItem('film', JSON.stringify(this.film));
                })
                .catch(error => this.filmCredits = { error })
        }
    },
    getters: {
        getFilmById: (state) => {
          return (filmId) => state.films.find((film) => film.id === filmId)
        },
    },
});