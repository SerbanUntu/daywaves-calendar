<script setup lang="ts">
import Tooltip from "./util/TooltipItem.vue";
import IconLeftArrow from "./icons/IconLeftArrow15x19.vue";
import IconRightArrow from "./icons/IconRightArrow15x19.vue";
import WeekSelectorMenu from "../components/menus/WeekSelectorMenu.vue";

import { useActivitiesStore } from "@/stores/Activities";
import { storeToRefs } from "pinia";

let store = useActivitiesStore();

const { displayWeek, openWeekSelectorMenu } = storeToRefs(store);
</script>

<template>
  <header id="header">
    <section id="header-banner-container" class="banner-container">
      <img src="../assets/images/Banner.png" alt="Daywaves logo and text" />
    </section>
    <section id="week-navigation-container" class="week-navigation">
      <article
        id="previous-week-button"
        class="week-button"
        @click="
          () => {
            store.changeDisplay(-1);
            openWeekSelectorMenu = false;
          }
        ">
        <IconLeftArrow class="left-arrow" />
        <Tooltip text="Previous week" />
      </article>
      <article
        id="open-calendar-button"
        class="week-display"
        @click="openWeekSelectorMenu = true">
        <h1 class="font-menu-title">
          {{ displayWeek }}
        </h1>
        <Tooltip text="Open calendar" />
      </article>
      <article
        id="next-week-button"
        class="week-button"
        @click="
          () => {
            store.changeDisplay(1);
            openWeekSelectorMenu = false;
          }
        ">
        <IconRightArrow class="right-arrow" />
        <Tooltip text="Next week" />
      </article>
    </section>
    <WeekSelectorMenu />
  </header>
</template>

<style scoped>
header {
  position: absolute;
  top: 0;
  left: 100px;

  display: inline-flex;
  align-items: center;

  width: calc(100% - 100px);
  max-width: 1820px;
}

.banner-container {
  height: 65px;
  padding: 20px;
}

@media only screen and (width <= 1135px) {
  .banner-container {
    opacity: 0;
  }
}

img {
  width: 197px;
  height: 36px;
}

.week-navigation {
  position: absolute;
  left: calc(50% - 300px);

  display: flex;
  gap: 10px;
  align-items: center;

  height: 65px;
  padding-top: 12.5px;
  padding-bottom: 12.5px;

  background: var(--bg-gray);
}

.week-button {
  width: 80px;
  height: 100%;

  background: var(--highlight-gray);

  stroke: var(--light-gray);

  transition: 200ms;
}

.week-display {
  width: 420px;
  height: 100%;
  background: var(--highlight-gray);
  transition: 200ms;
}

.week-button,
.week-display {
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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

@media only screen and (height <= 735px) {
  header {
    left: 13vh;
  }
}
</style>
