<script setup lang="ts">
import HourMarker from "./calendar/HourMarker.vue";
import DaySquare from "./calendar/DaySquare.vue";
import TimeMarker from "./icons/IconTimeMarker25x92.vue";

import { datesArr } from "../main";
import { dayToTop } from "../main";
import { timeToLeft } from "../main";
import { ref, computed, onMounted } from "vue";

type HourMarkerType = {
  hour: string;
  isHalf: boolean;
  pm: boolean;
};

let currentDate = ref<Date>(new Date());
let currentDay = computed(() =>
  currentDate.value.getDay() == 0 ? 7 : currentDate.value.getDay()
);
let computedTop = computed(() => ({
  top: `${dayToTop(currentDay.value - 1)}px`
}));
let computedLeft = computed(() => ({
  left: `${timeToLeft(
    currentDate.value.getHours(),
    currentDate.value.getMinutes(),
    currentDate.value.getSeconds()
  )}px`
}));

const updateTime = () => {
  document
    .getElementById(`${days[currentDay.value - 1]}-timeline`)
    ?.classList.remove("current-timeline");
  const now = new Date();
  currentDate.value = now;
  document
    .getElementById(`${days[currentDay.value - 1]}-timeline`)
    ?.classList.add("current-timeline");
};

const days: string[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];
let markers: HourMarkerType[] = Array.from({ length: 49 }, () => ({
  hour: "0",
  isHalf: false,
  pm: false
}));
for (let i = 0; i < 49; i++) {
  if (i % 2 == 1) {
    markers[i].isHalf = true;
    markers[i].hour = "'30";
  } else {
    markers[i].hour = ((i / 2) % 12).toString();
    if (Number(markers[i].hour) == 0) {
      markers[i].hour = "12";
    }
  }
  if (i > 24 && i < 48) {
    markers[i].pm = true;
  }
}

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});
</script>

<template>
  <section id="calendar" class="calendar">
    <aside id="day-squares" class="day-squares">
      <DaySquare
        v-for="i in 7"
        :id="days[i - 1] + '-square'"
        :key="i"
        :date="datesArr(currentDate)[i - 1]"
        :day="days[i - 1][0].toUpperCase()"
        :daily-note="true"
        :pins="0"
        :birthdays="0"
        :moon="true" />
    </aside>
    <section id="calendar-content" class="calendar-content">
      <i
        id="time-marker"
        class="time-marker"
        :style="{ ...computedTop, ...computedLeft }">
        <TimeMarker />
      </i>
      <article id="hour-displays" class="hour-displays">
        <HourMarker
          v-for="(marker, index) in markers"
          :key="index"
          :hour="marker.hour"
          :is-half="marker.isHalf"
          :pm="marker.pm" />
      </article>
      <article id="timelines" class="timelines">
        <section
          v-for="i in 7"
          :id="days[i - 1] + '-timeline'"
          :key="i"
          class="timeline">
          <article :id="days[i - 1] + '-day-line'" class="day-line" />
        </section>
      </article>
    </section>
  </section>
</template>

<style scoped>
.calendar {
  position: absolute;
  inset: 65px 0 220px 100px;

  overflow: auto;
  display: flex;
  flex-direction: row;

  max-width: 1752px;
  padding-right: 5px;
}

.day-squares {
  position: sticky;
  z-index: 1030;
  left: 0;

  display: flex;
  flex-direction: column;
  gap: 5px;

  width: 105px;
  height: 770px;
  padding-top: 40px;
  padding-left: 5px;

  background: var(--bg-gray);
}

.time-marker {
  position: absolute;
  z-index: 1019;

  display: flex;
  align-items: center;

  width: 25px;
  height: 100px;

  /* TODO Add drop shadow */
}

.calendar-content {
  display: inline-flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;

  height: 770px;
}

.hour-displays {
  position: sticky;
  z-index: 1020;
  top: 0;

  display: flex;
  gap: 12px;
  align-content: space-between;
  align-items: center;

  width: 1622px;
  height: 30px;
  padding: 4px 6px;
  padding-top: 0;

  opacity: 0.8;
  background: var(--bg-gray);
}

.timelines {
  position: absolute;
  top: 40px;

  display: flex;
  flex-wrap: wrap;
  gap: 5px 0;
  align-content: center;
  align-items: center;

  width: 1622px;
  height: 730px;
}

.timeline {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
}

.day-line {
  position: absolute;
  z-index: 1010;

  width: 100%;
  height: 5px;

  background: var(--element-gray);
}

.current-timeline {
  background: hsl(0deg 0% 12% / 100%);
}

.current-timeline .day-line {
  background: var(--highlight-gray);
}

@media only screen and (height <= 735px) {
  .calendar {
    left: 13vh;
  }
}
</style>
