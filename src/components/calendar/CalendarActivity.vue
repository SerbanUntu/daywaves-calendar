<script setup lang="ts">
import { DataInputEvent, useActivitiesStore } from "@/stores/Activities";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
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

let activityName = ref<string>(computedActivityRef.value.getName());
let activityWidth = computed(() =>
  store.timeToWidth(
    computedActivityRef.value.getDurationH(),
    computedActivityRef.value.getDurationM()
  )
);

if (
  computedActivityRef.value.getDurationH() == 0 &&
  computedActivityRef.value.getDurationM() < 30
) {
  activityName.value = "";
}

let computedDate = computed(
  () =>
    new Date(
      `${computedActivityRef.value.getDateY()}-${computedActivityRef.value.getDateM()}-${computedActivityRef.value.getDateD()}`
    )
);

let adjustedDay = computed(() =>
  computedDate.value.getDay() == 0 ? 7 : computedDate.value.getDay()
);

let computedStyle = computed(() => ({
  width: `${activityWidth.value}px`,
  background: `hsl(${computedActivityRef.value.getHue()}deg 40% 60% / 100%)`,
  left: `calc(11.6px + ${store.timeToLeft(
    computedActivityRef.value.getTimeH(),
    computedActivityRef.value.getTimeM(),
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
            `${computedActivityRef.getDateY()}-${computedActivityRef.getDateM()}-${computedActivityRef.getDateD()}`
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
