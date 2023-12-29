<script setup lang="ts">
import Tooltip from './util/Tooltip.vue';
import IconLeftArrow from './icons/IconLeftArrow15x19.vue';
import IconRightArrow from './icons/IconRightArrow15x19.vue';

import { weekName } from '../main';
import { ref, computed, onMounted } from 'vue'

const currentDate = ref<Date>(new Date());
let name = computed(() => weekName(currentDate.value));

const updateTime = () => {
  const now = new Date();
  currentDate.value = now;
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});

</script>

<template>
  <header id="header">
    <section id="header-banner-container" class="banner-container">
      <img src="../assets/images/Banner.png" alt="Daywaves logo and text" />
    </section>
    <section id="week-navigation-container" class="week-navigation">
      <article id="previous-week-button" class="week-button">
        <IconLeftArrow class="left-arrow" />
        <Tooltip text="Previous week" />
      </article>
      <article id="open-calendar-button" class="week-display">
        <p class="font-menu-title">{{ name }}</p>
        <Tooltip text="Open calendar" />
      </article>
      <article id="next-week-button" class="week-button">
        <IconRightArrow class="right-arrow" />
        <Tooltip text="Next week" />
      </article>
    </section>
  </header>
</template>

<style scoped>
header {
  display: inline-flex;
  width: calc(100% - 100px);
  max-width: 1820px;
  align-items: center;
  position: absolute;
  top: 0px;
  left: 100px;
}

.banner-container {
  padding: 20px 20px;
  height: 65px;
}

.week-navigation {
  height: 65px;
  display: flex;
  align-items: center;
  position: absolute;
  left: calc(50% - 300px);
  gap: 10px;
  background: var(--bg-gray);
}

.week-button {
  width: 80px;
  height: 40px;
  background: var(--highlight-gray);
  stroke: var(--light-gray);
  transition: 200ms;
}

.week-display {
  width: 420px;
  height: 40px;
  background: var(--highlight-gray);
  transition: 200ms;
}

.week-button,
.week-display {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
}

.week-button:hover,
.week-display:hover {
  background: var(--light-gray);
  stroke: var(--almost-white);
  transition: 200ms;
}

.week-button:active,
.week-display:active {
  background: var(--daywaves-blue);
  transition: 0ms;
}

.left-arrow {
  position: relative;
  left: -2px;
}

.right-arrow {
  position: relative;
  right: -2px;
}

.tooltip {
  top: 60px;
}
</style>