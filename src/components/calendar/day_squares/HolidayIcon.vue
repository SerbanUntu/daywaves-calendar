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
  cursor: pointer;

  position: relative;

  width: 29px;
  height: 24px;

  color: var(--light-gray);

  stroke: var(--light-gray);

  transition: 200ms;
}

.holiday-icon:hover {
  color: var(--daywaves-blue);
  stroke: var(--daywaves-blue);
  transition: 200ms;
}

.holiday-icon * {
  position: absolute;
}

.count-bg {
  z-index: 1000;
  top: 14px;
  left: 13px;

  width: 16px;
  height: 10px;

  background: var(--element-gray);
}

p {
  z-index: 1001;
  top: 14px;
  left: 13px;
}

.tooltip {
  left: 30px;
}
</style>
