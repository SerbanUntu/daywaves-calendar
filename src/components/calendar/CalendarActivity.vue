<script setup lang="ts">
import { DataInputEvent, useActivitiesStore } from "@/stores/Activities";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import Tooltip from "../util/TooltipItem.vue";

const store = useActivitiesStore();

const { formState, selected } = storeToRefs(store);

const props = defineProps({
  hashId: {
    default: "AAAAAAAAAAAAAAAA",
    type: String
  },
  name: {
    default: "Unnamed",
    type: String
  },
  hue: {
    default: 0,
    type: Number
  },
  dateD: {
    default: 1,
    type: Number
  },
  dateM: {
    default: 1,
    type: Number
  },
  dateY: {
    default: 1970,
    type: Number
  },
  timeH: {
    default: 12,
    type: Number
  },
  timeM: {
    default: 0,
    type: Number
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

console.log(props);

let activityName = ref<string>(props.name);
let activityWidth: number = store.timeToWidth(props.durationH, props.durationM);

if (props.durationH == 0 && props.durationM < 30) {
  activityName.value = "";
}

let computedDate = new Date(`${props.dateY}-${props.dateM}-${props.dateD}`);

let adjustedDay: number =
  computedDate.getDay() == 0 ? 7 : computedDate.getDay();

let computedStyle = computed(() => ({
  width: `${activityWidth}px`,
  background: `hsl(${props.hue}deg 40% 60% / 100%)`,
  left: `calc(11.6px + ${store.timeToLeft(props.timeH, props.timeM, 0)}px)`,
  top: `calc(10px + ${store.dayToTop(adjustedDay - 1)}px)`
}));

let computedStyleName = computed(() => ({
  width: `${activityWidth - 5}px`
}));
</script>

<template>
  <article
    :id="`${props.name}-${props.dateY}-${props.dateM}-${props.dateD}T${props.timeH}:${props.timeM}`"
    :class="{
      activity: true,
      selected: formState == DataInputEvent.EDIT && selected == props.hashId
    }"
    :style="{ ...computedStyle }"
    @click="
      () => {
        formState = DataInputEvent.EDIT;
        selected = props.hashId;
      }
    ">
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

.selected {
  outline: 3px solid white;
}
</style>
