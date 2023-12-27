<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Header from './components/Header.vue'
import DataInput from './components/DataInput.vue'
import Calendar from './components/Calendar.vue';
</script>

<template>
  <NavBar />
  <Header />
  <Calendar />
  <DataInput />
  <RouterView />
</template>

<style scoped></style>