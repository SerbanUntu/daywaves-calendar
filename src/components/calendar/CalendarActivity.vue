<script setup lang="ts">
import { dayToTop, timeToLeft, timeToWidth } from "@/main";
import { computed, ref } from "vue";
import Tooltip from "../util/TooltipItem.vue";

const props = defineProps({
  name: {
    default: "Unnamed123",
    type: String
  },
  hue: {
    default: 0,
    type: Number
  },
  date: {
    default: new Date("1970-01-01"),
    type: Date
  },
  durationH: {
    default: 1,
    type: Number
  },
  durationM: {
    default: 0,
    type: Number
  }
});

let displayDate = ref<Date>(new Date());
let sameWeek: boolean = true;
let activityName = ref<string>(props.name);
let activityWidth: number = timeToWidth(props.durationH, props.durationM);

if (props.durationH == 0 && props.durationM < 30) {
  activityName.value = "";
}

let adjustedDay: number = props.date.getDay() == 0 ? 7 : props.date.getDay();
let adjustedDisplayDay = computed(() =>
  displayDate.value.getDay() == 0 ? 7 : displayDate.value.getDay()
);

if (
  adjustedDay - adjustedDisplayDay.value !=
    Math.round(
      (props.date.getTime() - displayDate.value.getTime()) / 1000 / 60 / 60 / 24
    ) +
      1 &&
  adjustedDay - adjustedDisplayDay.value !=
    Math.round(
      (props.date.getTime() - displayDate.value.getTime()) / 1000 / 60 / 60 / 24
    )
) {
  sameWeek = false;
}

let computedStyle = computed(() => ({
  width: `${activityWidth}px`,
  background: `hsl(${props.hue}deg 40% 60% / 100%)`,
  left: `calc(11.6px + ${timeToLeft(
    props.date.getHours(),
    props.date.getMinutes(),
    0
  )}px)`,
  top: `calc(10px + ${dayToTop(adjustedDay - 1)}px)`,
  opacity: `${sameWeek ? 1 : 0}`
}));

let computedStyleName = computed(() => ({
  width: `${activityWidth - 5}px`
}));
</script>

<template>
  <article class="activity" :style="{ ...computedStyle }">
    <p
      id="activity-name"
      class="activity-name"
      :style="{ ...computedStyleName }">
      {{ activityName }}
    </p>
    <Tooltip :text="props.name" />
  </article>
</template>

<style scoped>
.activity {
  cursor: pointer;

  position: absolute;

  height: 80px;
  padding: 5px;

  border-radius: 10px;
}

.activity-name {
  overflow: hidden;

  width: 50px;
  height: 20px;

  color: white;
  text-overflow: ellipsis;
  text-shadow: 2px 2px 2px hsl(0deg 0% 0% / 25%);
  white-space: nowrap;
}

.tooltip {
  top: -30px;
  left: -5px;
}
</style>
