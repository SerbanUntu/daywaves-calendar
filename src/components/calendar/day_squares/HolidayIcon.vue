<script setup lang="ts">
import Tooltip from "@/components/util/TooltipItem.vue";
import IconHoliday from "@/components/icons/IconHoliday24x24.vue";

const props = defineProps({
  count: {
    default: 0,
    type: Number
  }
});
</script>

<template>
  <article class="holiday-icon">
    <IconHoliday />
    <section v-if="props.count && props.count > 1" class="count-bg" />
    <p v-if="props.count && props.count > 1" class="count font-count">
      {{ props.count }}
    </p>
    <Tooltip text="Holidays" />
  </article>
</template>

<style scoped>
.holiday-icon {
  width: 29px;
  height: 24px;
  position: relative;
  cursor: pointer;
  stroke: var(--light-gray);
  color: var(--light-gray);
  transition: 200ms;
}

.holiday-icon:hover {
  stroke: var(--daywaves-blue);
  color: var(--daywaves-blue);
  transition: 200ms;
}

.holiday-icon * {
  position: absolute;
}

.count-bg {
  left: 13px;
  top: 14px;
  width: 16px;
  height: 10px;
  background: var(--element-gray);
  z-index: 1000;
}

p {
  left: 13px;
  top: 14px;
  z-index: 1001;
}

.tooltip {
  left: 30px;
}
</style>
