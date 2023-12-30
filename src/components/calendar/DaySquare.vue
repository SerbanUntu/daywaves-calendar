<script setup lang="ts">
import DSIconBirthday from './day_squares/BirthdayIcon.vue';
import DSIconGlobe from './day_squares/GlobeIcon.vue';
import DSIconHoliday from './day_squares/HolidayIcon.vue';
import DSIconMoon from './day_squares/MoonIcon.vue';
import DSIconNote from './day_squares/NoteIcon.vue';
import DSIconPin from './day_squares/PinIcon.vue';

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
  <article class="day-square">
    <section class="text-container">
      <p class="date font-standard-xl">{{ props.date }}</p>
      <p class="day font-standard-xl">{{ props.day }}</p>
    </section>
    <section class="icons-container">
      <i class="daily-note">
        <DSIconNote v-if="dailyNote" />
      </i>
      <i class="pins">
        <DSIconPin v-if="pins != undefined" :count="pins" />
      </i>
      <i class="globe">
        <DSIconGlobe v-if="globe" />
      </i>
      <i class="birthdays">
        <DSIconBirthday v-if="birthdays != undefined" :count="birthdays" />
      </i>
      <i class="moon">
        <DSIconMoon v-if="moon" />
      </i>
      <i class="holidays">
        <DSIconHoliday v-if="holidays != undefined" :count="holidays" />
      </i>
    </section>
  </article>
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