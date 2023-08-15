<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
    <div v-if="user">
        <h1>Hi {{user.firstName}}!</h1>
        <p><router-link to="/films">Get Popular</router-link></p>
        <p><router-link to="/films">Get Now Playing</router-link></p>
    </div>
</template>