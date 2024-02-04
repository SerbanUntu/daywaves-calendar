<script setup lang="ts">
import { ref } from "vue";
import Navbar from "../components/PageNavbar.vue";
import Header from "../components/PageHeader.vue";
import DataInput from "../components/DataInput.vue";
import Calendar from "../components/CalendarContent.vue";
import GoToLogin from "../components/util/GoToLogin.vue";

let isLoggedIn = ref<boolean>(true);
</script>

<template>
  <article v-if="isLoggedIn">
    <Navbar />
    <Header />
    <Calendar />
    <DataInput />
  </article>
  <GoToLogin v-else />
</template>
