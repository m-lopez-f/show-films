<script setup>
    defineProps({
        srcImg: String,
        alt: String,
        active: Boolean,
        filmId: Number
    })
</script>
<template>
     <div class="carousel-item" :class="{'active': active}">
        <router-link :to="`/films/${filmId}`"><img v-lazy="srcImg" class="d-block img-fluid" :alt="alt" /></router-link>
    </div>
</template>