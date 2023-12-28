<script setup lang="ts">
import Tooltip from './Tooltip.vue'
import SIconLeftArrow from './icons/SIconLeftArrow.vue';
import SIconRightArrow from './icons/SIconRightArrow.vue';

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
  <header>
    <div class="banner-container">
      <img src="../../public/banner.svg" alt="Daywaves logo and text" />
    </div>
    <div class="week-navigation">
      <div class="week-button">
        <SIconLeftArrow />
        <Tooltip text="Previous week" />
      </div>
      <div class="week-display">
        <p class="font-menu-title">{{ name }}</p>
        <Tooltip text="Open calendar" />
      </div>
      <div class="week-button">
        <SIconRightArrow />
        <Tooltip text="Next week" />
      </div>
    </div>
  </header>
</template>
  
<style scoped>
header {
  display: inline-flex;
  width: calc(100% - 100px);
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
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  background: var(--highlight-gray);
  stroke: var(--light-gray);
  transition: 200ms;
}

.week-display {
  width: 420px;
  height: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  background: var(--highlight-gray);
  transition: 200ms;
}

.week-button,
.week-display {
  cursor: pointer;
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