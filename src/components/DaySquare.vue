<script setup lang="ts">
import DSIconBirthday from './icons/DSIconBirthday.vue';
import DSIconGlobe from './icons/DSIconGlobe.vue';
import DSIconHoliday from './icons/DSIconHoliday.vue';
import DSIconMoon from './icons/DSIconMoon.vue';
import DSIconNote from './icons/DSIconNote.vue';
import DSIconPin from './icons/DSIconPin.vue';

const props = defineProps({
  date: Number,
  day: String,
  dailyNote: Boolean,
  pins: Number,
  globe: Boolean,
  birthdays: Number,
  moon: Boolean,
  holidays: Number,
});

</script>

<template>
  <div class="day-square">
    <div class="text-container">
      <p class="date font-standard-xl">{{ props.date }}</p>
      <p class="day font-standard-xl">{{ props.day }}</p>
    </div>
    <div class="icons-container">
      <i id="daily-note">
        <DSIconNote v-if="dailyNote" />
      </i>
      <i id="pins">
        <DSIconPin v-if="pins != undefined" :count="pins" />
      </i>
      <i id="globe">
        <DSIconGlobe v-if="globe" />
      </i>
      <i id="birthdays">
        <DSIconBirthday v-if="birthdays != undefined" :count="birthdays" />
      </i>
      <i id="moon">
        <DSIconMoon v-if="moon" />
      </i>
      <i id="holidays">
        <DSIconHoliday v-if="holidays != undefined" :count="holidays" />
      </i>
    </div>
  </div>
</template>

<style scoped>
.day-square {
  display: flex;
  flex-direction: row;
  width: 100px;
  height: 100px;
  background: var(--element-gray);
}

.text-container {
  display: flex;
  flex-direction: column;
  position: relative;
  width: fit-content;
  height: fit-content;
  top: 5px;
  left: 5px;
}

.day {
  color: var(--light-gray);
}

.icons-container {
  position: relative;
  display: flex;
  width: 61px;
  height: fit-content;
  top: 6px;
  left: 15px;
  justify-self: flex-end;
  align-items: flex-start;
  align-content: flex-start;
  gap: 8px;
  flex-wrap: wrap;
}

i {
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

i:nth-child(2),
i:nth-child(4),
i:nth-child(6) {
  width: 29px;
}
</style>