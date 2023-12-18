<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Header from './components/Header.vue'
</script>

<template>
  <NavBar />
  <Header />
  <RouterView />
</template>

<style scoped></style>