<script setup lang="ts">
import { computed, ref } from "vue";
import IconLeftArrow from "../icons/IconLeftArrow15x19.vue";
import IconRightArrow from "../icons/IconRightArrow15x19.vue";
import { useActivitiesStore } from "@/stores/Activities";
import { storeToRefs } from "pinia";
import Tooltip from "../util/TooltipItem.vue";

let store = useActivitiesStore();

const { displayDate, displayWeek, openWeekSelectorMenu } = storeToRefs(store);

type Day = {
  inMonth: boolean;
  number: number;
};

type DisplayMonth = {
  month: number;
  year: number;
};

const monthNames: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const displayMonth = ref<DisplayMonth>({
  month: displayDate.value.getMonth(),
  year: displayDate.value.getFullYear()
});
const currentMonthWeek = ref<string>("none");
const monthWeeks = ref<string[]>([]);
const numberOfWeeks = ref<number>(6);
const days = ref<Day[]>([]);

for (let i = 0; i < 42; i++) {
  days.value.push({ inMonth: false, number: -1 });
}

function updateMonthDetails(change: number) {
  if (change === 0) {
    displayMonth.value.month = displayDate.value.getMonth();
    displayMonth.value.year = displayDate.value.getFullYear();
  }
  displayMonth.value.month += change;
  if (displayMonth.value.month < 0) {
    displayMonth.value.month = 11;
    displayMonth.value.year -= 1;
  }
  if (displayMonth.value.month > 11) {
    displayMonth.value.month = 0;
    displayMonth.value.year += 1;
  }

  let monthStringForConstructor = (displayMonth.value.month + 1).toString();
  if (monthStringForConstructor.length === 1)
    monthStringForConstructor = "0" + monthStringForConstructor;

  const referenceDate: Date = new Date(
    `${displayMonth.value.year}-${monthStringForConstructor}-01`
  );

  let referenceDay: number = referenceDate.getDay();
  if (referenceDay === 0) referenceDay = 7;
  referenceDay -= 1;
  for (let i = 0; i < referenceDay; i++) {
    let thisDate: Date = new Date(referenceDate);
    thisDate.setDate(referenceDate.getDate() - referenceDay + i);
    days.value[i].inMonth = false;
    days.value[i].number = thisDate.getDate();
  }
  let thisDate: Date = new Date(referenceDate);
  for (let i = referenceDay; i < 42; i++) {
    days.value[i].inMonth =
      thisDate.getMonth() === referenceDate.getMonth() ? true : false;
    days.value[i].number = thisDate.getDate();
    thisDate.setDate(thisDate.getDate() + 1);
  }
  numberOfWeeks.value = 0;
  monthWeeks.value = [];
  thisDate = new Date(referenceDate);
  thisDate.setDate(thisDate.getDate() - referenceDay);
  numberOfWeeks.value += 1;
  monthWeeks.value.push(store.weekName(thisDate));
  thisDate.setDate(thisDate.getDate() + 7);
  while (thisDate.getMonth() === referenceDate.getMonth()) {
    numberOfWeeks.value += 1;
    monthWeeks.value.push(store.weekName(thisDate));
    thisDate.setDate(thisDate.getDate() + 7);
  }
}

setInterval(() => {
  if (openWeekSelectorMenu.value === false) {
    updateMonthDetails(0);
    currentMonthWeek.value = "none";
  }
}, 1);

let showWeekName = computed(() => ({
  color:
    currentMonthWeek.value === "none" ? "var(--bg-gray)" : "var(--light-gray)"
}));
</script>

<template>
  <dialog v-if="openWeekSelectorMenu" class="week-selector-menu">
    <nav class="month-navigation">
      <article
        class="button-previous-month month-button"
        @click="updateMonthDetails(-1)">
        <IconLeftArrow class="left-arrow" />
        <Tooltip text="Previous month" />
      </article>
      <article class="month-display">
        <p class="font-small-menu-title">
          {{ `${monthNames[displayMonth.month]} ${displayMonth.year}` }}
        </p>
      </article>
      <article
        class="button-next-month month-button"
        @click="updateMonthDetails(1)">
        <IconRightArrow class="right-arrow" />
        <Tooltip text="Next month" />
      </article>
    </nav>
    <main class="calendar-display">
      <section
        v-for="(row, index) in [...Array(numberOfWeeks).keys()]"
        :key="index"
        class="row-of-days"
        @click="
          () => {
            if (currentMonthWeek !== '') {
              displayWeek = currentMonthWeek;
            }
            displayDate.setFullYear(displayMonth.year);
            displayDate.setMonth(displayMonth.month);
            displayDate.setDate(1 + row * 7);
            openWeekSelectorMenu = false;
          }
        "
        @mouseenter="currentMonthWeek = monthWeeks[row]"
        @mouseleave="currentMonthWeek = 'none'">
        <article
          v-for="(day, dayIndex) in days.slice(row * 7, row * 7 + 7)"
          :key="dayIndex"
          :class="day.inMonth ? 'day-item' : 'hidden-day-item'">
          <p class="font-standard-small">{{ day.number }}</p>
        </article>
      </section>
    </main>
    <p class="selected-week-text" :style="showWeekName">
      {{ currentMonthWeek }}
    </p>
    <article class="closing-button" @click="openWeekSelectorMenu = false">
      <article class="x-icon-one" />
      <article class="x-icon-two" />
    </article>
  </dialog>
</template>

<style scoped>
.week-selector-menu {
  position: absolute;
  z-index: 50000;
  top: calc(100px);
  left: calc(50% - 460px / 2);

  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 10px;

  background-color: var(--bg-gray);
  border: 1px solid var(--light-gray);
  border-radius: 20px;
}

.month-navigation {
  position: relative;

  display: flex;
  flex-direction: row;
  gap: 5px;

  height: 25px;
  padding-right: 30px;
  padding-left: 30px;
}

.month-button {
  cursor: pointer;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 100%;

  background-color: var(--highlight-gray);
  border-radius: 25px;

  stroke: var(--light-gray);

  transition: 200ms;
}

.month-display {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 270px;
  height: 100%;

  color: var(--almost-white);
  text-align: center;

  background-color: var(--highlight-gray);
  border-radius: 25px;
}

.month-button:hover {
  background: var(--light-gray);
  stroke: var(--almost-white);
  transition: 200ms;
}

.month-button:active {
  background: var(--daywaves-blue);
  transition: 0ms;
}

.left-arrow,
.right-arrow {
  position: relative;
  scale: 0.6;
}

.left-arrow {
  right: 1px;
}

.right-arrow {
  left: 1px;
}

.calendar-display {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;

  width: 100%;
}

.row-of-days {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 5px;
}

.day-item {
  color: var(--light-gray);
  background-color: var(--element-gray);
}

.hidden-day-item {
  color: var(--bg-gray);
  background-color: var(--bg-gray);
}

.day-item,
.hidden-day-item {
  width: 50px;
  height: 50px;
  padding: 4px;

  border-radius: 10px;

  transition: 200ms;
}

.row-of-days:hover {
  .day-item {
    color: var(--almost-white);
    background-color: var(--light-gray);
    transition: 200ms;
  }

  .hidden-day-item {
    color: var(--light-gray);
    background-color: var(--element-gray);
    transition: 200ms;
  }
}

.row-of-days:active {
  .day-item,
  .hidden-day-item {
    color: var(--almost-white);
    background-color: var(--daywaves-blue);
    transition: 0ms;
  }
}

.selected-week-text {
  color: var(--light-gray);
  text-align: center;
}

.closing-button {
  cursor: pointer;

  position: absolute;
  top: -5px;
  right: -5px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;

  background-color: var(--intense-red);
}

.x-icon-one,
.x-icon-two {
  position: absolute;
  width: 10px;
  height: 2px;
  background-color: white;
}

.x-icon-one {
  rotate: 45deg;
}

.x-icon-two {
  rotate: -45deg;
}

.tooltip {
  top: 35px;
}
</style>
