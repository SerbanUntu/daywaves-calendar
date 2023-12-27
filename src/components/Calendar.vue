<script lang="ts">
import HourMarker from './HourMarker.vue';

type HourMarker = {
  hour: string,
  isHalf: boolean,
  pm: boolean,
}

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
  if (i > 24) {
    markers[i].pm = true;
  }
}

export default {
  components: {
    HourMarker,
  },
  data() {
    return {
      markers: markers,
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    };
  },
}
</script>

<template>
  <div class="calendar">
    <div class="day-squares">
      <div :id="day + '-square'" class="day-square" v-for="day in days"></div>
    </div>
    <div class="calendar-content">
      <div class="hour-displays">
        <HourMarker v-for="marker in markers" :hour="marker.hour" :isHalf="marker.isHalf" :pm="marker.pm" />
      </div>
      <div class="timelines">
        <div :id="day + '-timeline'" class="timeline" v-for="day in days">
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
  overflow: scroll;
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

.day-square {
  width: 100px;
  height: 100px;
  background: var(--element-gray);
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

.day-line {
  width: 100%;
  height: 5px;
  background: var(--element-gray);
  position: absolute;
  z-index: 1010;
}
</style>