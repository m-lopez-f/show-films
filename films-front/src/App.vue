<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { Nav } from '@/components';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
  <div class="app-container bg-light">
      <Nav />
      <div class="container pt-4 pb-4">
          <RouterView />
      </div>
  </div>
</template>