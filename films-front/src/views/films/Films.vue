<script setup>
import { storeToRefs } from 'pinia';
import { useFilmsStore } from '@/stores';
import { onMounted } from 'vue'
import { SlideFilm, Carousel } from '@/components';

const filmsStore = useFilmsStore();
const { films, popularFilms } = storeToRefs(filmsStore);

const reload = () => {
    filmsStore.getAllNowPlaying();
    filmsStore.getAllPopulars();
}

onMounted(() => {
    filmsStore.getAllNowPlaying();
    filmsStore.getAllPopulars();
})
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <button class="btn btn-dark" @click="reload">Recargar</button>
            </div>
        </div>
        <div class="row">
            
            <div v-if="films && !films.loading" class="col">
                <h1>Now Watching</h1>
                <Carousel :id="'carouselFilms'">
                    <SlideFilm
                        :key="film.id"
                        :src-img="`https://image.tmdb.org/t/p/w500${film.poster_path}`"
                        :film-id="film.id"
                        :alt="film.title"
                        :active="index == 0"
                        v-for="(film, index) in films">
                    </SlideFilm>
                </Carousel>
            </div>
            <div v-else>
                <div class="spin col"><p></p></div>
            </div>
            <div v-if="popularFilms && !popularFilms.loading" class="col">
                <h1>Popular</h1>
                <Carousel :id="'carouselFilmsPopular'">
                    <SlideFilm
                        :key="film.id"
                        :src-img="`https://image.tmdb.org/t/p/w500${film.poster_path}`"
                        :alt="film.title"
                        :film-id="film.id"
                        :active="index == 0"
                        v-for="(film, index) in popularFilms">
                    </SlideFilm>
                </Carousel>
            </div>
            <div v-else>
                <div class="spin col"><p></p></div>
            </div>
        </div>
    </div>
</template>
<style>
div.spin {
  width: 50px;
  height: 50px;
  border-radius: 300px;
  background-color: #0CB1C4;
  animation-name: spin;
  animation-duration: 300ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear; 
  /* transform: rotate(3deg); */
   /* transform: rotate(0.3rad);/ */
   /* transform: rotate(3grad); */ 
   /* transform: rotate(.03turn);  */
}
div.spin p {
  background-color: red;
  width: 40px;
  height: 40px;
}

@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}
</style>