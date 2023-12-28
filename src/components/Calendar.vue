<script setup lang="ts">
import HourMarker from './HourMarker.vue';
import DaySquare from './DaySquare.vue';
import TimeMarker from './icons/TimeMarker.vue';

import { datesArr } from '../main';
import { dayToTop } from '../main';
import { timeToLeft } from '../main';
import { ref, computed, onMounted } from 'vue';

type HourMarker = {
  hour: string,
  isHalf: boolean,
  pm: boolean,
}

let markers = ref<HourMarker[]>([]);

let dates = ref<number[]>([]);
const days: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

let currentDate = ref<Date>(new Date());
let currentDay: number = currentDate.value.getDay();

markers.value = Array.from({ length: 49 }, () => ({
  hour: '0',
  isHalf: false,
  pm: false,
}));

for (let i = 0; i < 49; i++) {
  if (i % 2 == 1) {
    markers.value[i].isHalf = true;
    markers.value[i].hour = '\'30';
  } else {
    markers.value[i].hour = ((i / 2) % 12).toString();
    if (Number(markers.value[i].hour) == 0) {
      markers.value[i].hour = '12';
    }
  }
  if (i > 24 && i < 48) {
    markers.value[i].pm = true;
  }
}

onMounted(() => {
  dates.value = datesArr(currentDate.value);
  document.getElementById(`${days[currentDay - 1]}-timeline`)?.classList.add('current-timeline');
});

const computedTop = computed(() => ({ top: `${dayToTop(currentDay - 1)}px` }));
const computedLeft = computed(() => ({ left: `${timeToLeft(currentDate.value.getHours(), currentDate.value.getMinutes())}px` }));

console.log(currentDate.value.getHours(), currentDate.value.getMinutes(), computedLeft.value);
</script>

<template>
  <div class="calendar">
    <div class="day-squares">
      <DaySquare :id="days[i - 1] + '-square'" v-for="i in 7" :date="dates[i - 1]" :day="days[i - 1][0].toUpperCase()" :dailyNote="true" :pins="0" :birthdays="0" :moon="true">
      </DaySquare>
    </div>
    <div class="calendar-content">
      <i class="time-marker" :style="{ ...computedTop, ...computedLeft }">
        <TimeMarker />
      </i>
      <div class="hour-displays">
        <HourMarker v-for="marker in markers" :hour="marker.hour" :isHalf="marker.isHalf" :pm="marker.pm" />
      </div>
      <div class="timelines">
        <div :id="days[i - 1] + '-timeline'" class="timeline" v-for="i in 7">
          <div class="day-line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  display: flex;
  flex-direction: row;
  position: absolute;
  max-width: 1752px;
  right: 0px;
  bottom: 240px;
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
</style>