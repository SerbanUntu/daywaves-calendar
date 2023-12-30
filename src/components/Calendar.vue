<script setup lang="ts">
import HourMarker from './calendar/HourMarker.vue';
import DaySquare from './calendar/DaySquare.vue';
import TimeMarker from './icons/IconTimeMarker25x92.vue';

import { datesArr } from '../main';
import { dayToTop } from '../main';
import { timeToLeft } from '../main';
import { ref, computed, onMounted } from 'vue';

type HourMarker = {
  hour: string,
  isHalf: boolean,
  pm: boolean,
}

let currentDate = ref<Date>(new Date());
let currentDay = computed(() => currentDate.value.getDay() == 0 ? 7 : currentDate.value.getDay());
let computedTop = computed(() => ({ top: `${dayToTop(currentDay.value - 1)}px` }));
let computedLeft = computed(() => ({ left: `${timeToLeft(currentDate.value.getHours(), currentDate.value.getMinutes(), currentDate.value.getSeconds())}px` }));

const updateTime = () => {
  document.getElementById(`${days[currentDay.value - 1]}-timeline`)?.classList.remove('current-timeline');
  const now = new Date();
  currentDate.value = now;
  document.getElementById(`${days[currentDay.value - 1]}-timeline`)?.classList.add('current-timeline');
};

const days: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
let markers: HourMarker[] = Array.from({ length: 49 }, () => ({
  hour: '0',
  isHalf: false,
  pm: false,
}));
for (let i = 0; i < 49; i++) {
  if (i % 2 == 1) {
    markers[i].isHalf = true;
    markers[i].hour = '\'30';
  } else {
    markers[i].hour = ((i / 2) % 12).toString();
    if (Number(markers[i].hour) == 0) {
      markers[i].hour = '12';
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
      <DaySquare :id="days[i - 1] + '-square'" v-for="i in 7" :date="datesArr(currentDate)[i - 1]"
        :day="days[i - 1][0].toUpperCase()" :dailyNote="true" :pins="0" :birthdays="0" :moon="true">
      </DaySquare>
    </aside>
    <section id="calendar-content" class="calendar-content">
      <i id="time-marker" class="time-marker" :style="{ ...computedTop, ...computedLeft }">
        <TimeMarker />
      </i>
      <article id="hour-displays" class="hour-displays">
        <HourMarker v-for="marker in markers" :hour="marker.hour" :isHalf="marker.isHalf" :pm="marker.pm" />
      </article>
      <article id="timelines" class="timelines">
        <section :id="days[i - 1] + '-timeline'" class="timeline" v-for="i in 7">
          <article :id="days[i - 1] + '-day-line'" class="day-line"></article>
        </section>
      </article>
    </section>
  </section>
</template>

<style scoped>
.calendar {
  display: flex;
  flex-direction: row;
  position: absolute;
  max-width: 1752px;
  right: 0px;
  bottom: 220px;
  top: 65px;
  left: 100px;
  padding-right: 5px;
  overflow: auto;
}

.day-squares {
  position: sticky;
  display: flex;
  flex-direction: column;
  width: 105px;
  padding-left: 5px;
  left: 0px;
  padding-top: 40px;
  gap: 5px;
  height: 770px;
  background: var(--bg-gray);
  z-index: 1030;
}

.time-marker {
  position: absolute;
  z-index: 1019;
  width: 25px;
  height: 100px;
  display: flex;
  align-items: center;
  filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.50));
}

.calendar-content {
  display: inline-flex;
  height: 770px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.hour-displays {
  top: 0px;
  position: sticky;
  z-index: 1020;
  display: flex;
  width: 1622px;
  height: 30px;
  padding: 4px 6px;
  align-items: center;
  align-content: space-between;
  background: var(--bg-gray);
  opacity: 0.8;
  gap: 12px;
}

.timelines {
  display: flex;
  width: 1622px;
  height: 730px;
  align-items: center;
  align-content: center;
  gap: 5px 0px;
  flex-wrap: wrap;
  position: absolute;
  top: 40px;
}

.timeline {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
}

.current-timeline {
  background: hsla(0, 0%, 12%, 1);

  .day-line {
    background: var(--highlight-gray);
  }
}

.day-line {
  width: 100%;
  height: 5px;
  background: var(--element-gray);
  position: absolute;
  z-index: 1010;
}

@media only screen and (max-height: 735px) {
  .calendar {
    left: 13vh;
  } 
}
</style>