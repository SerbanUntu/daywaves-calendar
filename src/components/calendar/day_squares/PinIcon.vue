<script setup lang="ts">
import Tooltip from "@/components/util/TooltipItem.vue";
import IconPin from "@/components/icons/IconPin24x24.vue";

const props = defineProps({
  count: {
    default: 0,
    type: Number
  }
});
</script>

<template>
  <article :class="{ 'pin-icon': true, zero: count == 0 }">
    <IconPin />
    <p v-if="props.count && props.count > 1" class="font-count">
      {{ props.count }}
    </p>
    <p v-else class="large-count font-count">+</p>
    <Tooltip text="Pins" />
  </article>
</template>

<style scoped>
.pin-icon {
  width: 29px;
  height: 24px;
  position: relative;
  cursor: pointer;
  stroke: var(--light-gray);
  color: var(--light-gray);
  transition: 200ms;
}

.pin-icon * {
  position: absolute;
}

.large-count {
  top: 10px;
  font-size: 16px;
}

p {
  left: 13px;
  top: 14px;
  z-index: 1001;
}

.pin-icon:hover {
  stroke: var(--daywaves-blue);
  color: var(--daywaves-blue);
  transition: 200ms;
}

.zero {
  stroke: var(--highlight-gray);
  color: var(--highlight-gray);
}

.zero:hover {
  stroke: var(--light-gray);
  color: var(--light-gray);
}

.zero:active {
  stroke: var(--daywaves-blue);
  color: var(--daywaves-blue);
  transition: 0ms;
}

.tooltip {
  left: 30px;
}
</style>
