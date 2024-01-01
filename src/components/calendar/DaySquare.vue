<script setup lang="ts">
import DSIconBirthday from "./day_squares/BirthdayIcon.vue";
import DSIconGlobe from "./day_squares/GlobeIcon.vue";
import DSIconHoliday from "./day_squares/HolidayIcon.vue";
import DSIconMoon from "./day_squares/MoonIcon.vue";
import DSIconNote from "./day_squares/NoteIcon.vue";
import DSIconPin from "./day_squares/PinIcon.vue";

const props = defineProps({
  date: {
    default: 1,
    type: Number
  },
  day: {
    default: "M",
    type: String
  },
  dailyNote: {
    default: true,
    type: Boolean
  },
  pins: {
    default: 0,
    type: Number
  },
  globe: {
    default: false,
    type: Boolean
  },
  birthdays: {
    default: 0,
    type: Number
  },
  moon: {
    default: true,
    type: Boolean
  },
  holidays: {
    default: 0,
    type: Number
  }
});
</script>

<template>
  <article class="day-square">
    <section class="text-container">
      <p class="date font-standard-xl">
        {{ props.date }}
      </p>
      <p class="day font-standard-xl">
        {{ props.day }}
      </p>
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
        <DSIconHoliday
          v-if="holidays != undefined && holidays > 0"
          :count="holidays" />
      </i>
    </section>
  </article>
</template>

<style scoped>
.day-square {
  position: relative;

  display: flex;
  flex-direction: row;

  width: 100px;
  height: 100px;

  background: var(--element-gray);
}

.text-container {
  position: relative;
  top: 5px;
  left: 5px;

  display: flex;
  flex-direction: column;

  width: fit-content;
  height: fit-content;
}

.day {
  color: var(--light-gray);
}

.icons-container {
  position: absolute;
  top: 6px;
  right: 0;

  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-content: flex-start;
  align-items: flex-start;
  justify-self: flex-end;

  width: 61px;
  height: fit-content;
}

i {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;
}

i:nth-child(2),
i:nth-child(4),
i:nth-child(6) {
  width: 29px;
}
</style>
