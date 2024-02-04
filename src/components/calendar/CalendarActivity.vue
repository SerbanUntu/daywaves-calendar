<script setup lang="ts">
import { DataInputEvent, useActivitiesStore } from "@/stores/Activities";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import Tooltip from "../util/TooltipItem.vue";

const store = useActivitiesStore();

const { formState, clickedActivity } = storeToRefs(store);

const props = defineProps({
  hashId: {
    default: "",
    type: String
  },
  dateStart: {
    default: "",
    type: Date
  }
});

let computedActivityRef = computed(() =>
  store.getActivityRef(props.dateStart, props.hashId)
);

let computedDurationH = computed(() =>
  Math.floor(
    (Number(computedActivityRef.value.getTimeEndH()) * 60 -
      Number(computedActivityRef.value.getTimeStartH()) * 60 +
      Number(computedActivityRef.value.getTimeEndM()) -
      Number(computedActivityRef.value.getTimeStartM())) /
      60
  )
);

let computedDurationM = computed(() =>
  Math.floor(
    (Number(computedActivityRef.value.getTimeEndH()) * 60 -
      Number(computedActivityRef.value.getTimeStartH()) * 60 +
      Number(computedActivityRef.value.getTimeEndM()) -
      Number(computedActivityRef.value.getTimeStartM())) %
      60
  )
);

let activityName = computed(() => {
  if (computedDurationH.value == 0 && computedDurationM.value < 30) {
    return "";
  }
  return computedActivityRef.value.getName();
});

let activityWidth = computed(() =>
  store.timeToWidth(computedDurationH.value, computedDurationM.value)
);

let computedDate = computed(
  () =>
    new Date(
      `${computedActivityRef.value.getDateStartY()}-${computedActivityRef.value.getDateStartM()}-${computedActivityRef.value.getDateStartD()}`
    )
);

let adjustedDay = computed(() =>
  computedDate.value.getDay() == 0 ? 7 : computedDate.value.getDay()
);

let computedStyle = computed(() => ({
  width: `${activityWidth.value}px`,
  background: `hsl(${computedActivityRef.value.getHue()}deg 40% 60% / 100%)`,
  left: `calc(11.6px + ${store.timeToLeft(
    computedActivityRef.value.getTimeStartH(),
    computedActivityRef.value.getTimeStartM(),
    0
  )}px)`,
  top: `calc(10px + ${store.dayToTop(adjustedDay.value - 1)}px)`
}));

let computedStyleName = computed(() => ({
  width: `${activityWidth.value - 5}px`
}));
</script>

<template>
  <article
    :id="`${props.hashId}`"
    :class="{
      activity: true,
      selected:
        formState == DataInputEvent.EDIT &&
        clickedActivity?.getId() == props.hashId
    }"
    :style="{ ...computedStyle }"
    @click="
      () => {
        if (formState == DataInputEvent.NONE) {
          formState = DataInputEvent.EDIT;
          const activityDate = new Date(
            `${computedActivityRef.getDateStartY()}-${computedActivityRef.getDateStartM()}-${computedActivityRef.getDateStartD()}`
          );
          store.setClickedActivity(props.hashId, store.weekName(activityDate));
        }
      }
    ">
    <p
      id="activity-name"
      class="activity-name"
      :style="{ ...computedStyleName }">
      {{ activityName }}
    </p>
    <Tooltip :text="computedActivityRef.getName()" />
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
