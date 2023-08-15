<script setup>

import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useFilmsStore } from '@/stores';
import { computed } from 'vue'

const filmsStore = useFilmsStore();
const { filmCredits, film, films } = storeToRefs(filmsStore);
const route = useRoute();
const filmId = route.params.filmId;

// let film = null
if (filmId) {
    filmsStore.filmGetCredits(filmId);
}

const titleFilm = computed(() => {
    return films.find((film) => film.id === filmId).title
})

const srcImg = computed(() => {
  return films.find((film) => film.id === filmId).poster_path
})
</script>

<template>
    <template v-if="!(filmCredits.loading || filmCredits.error)">
        
        <div class="container text-center">
            <h1>{{film?.title}}</h1>
            <div class="row">
                <div class="col">
                    <img v-lazy="`https://image.tmdb.org/t/p/w500${film?.poster_path}`" class="img-fluid"/>
                </div>
                <div class="col">
                    <h3>Actors</h3>
                    <div class="row">
                        <div class="row row-cols-1 row-cols-md-2 g-4">
                            <div class="col" v-for="actor in filmCredits?.cast">
                                <div class="card">
                                    <img v-lazy="`https://image.tmdb.org/t/p/w500${actor.profile_path}`" class="card-img-top" :alt="actor.original_name" />
                                <div class="card-body">
                                    <h5 class="card-title">{{actor.original_name}}</h5>
                                    <p class="card-text">Character: {{ actor.character }}</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template v-if="filmCredits.loading">
        <div class="text-center m-5">
            <span class="spinner-border spinner-border-lg align-center"></span>
        </div>
    </template>
    <template v-if="filmCredits?.error">
        <div class="text-center m-5">
            <div class="text-danger">Error loading filmCredits: {{filmCredits.error}}</div>
        </div>
    </template>
</template>