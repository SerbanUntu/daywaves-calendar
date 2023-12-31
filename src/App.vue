<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/PageNavbar.vue";
import Header from "./components/PageHeader.vue";
import DataInput from "./components/DataInput.vue";
import Calendar from "./components/CalendarContent.vue";
</script>

<template>
  <NavBar />
  <Header />
  <Calendar />
  <DataInput />
  <RouterView />
</template>