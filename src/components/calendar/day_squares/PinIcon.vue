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
  cursor: pointer;

  position: relative;

  width: 29px;
  height: 24px;

  color: var(--light-gray);

  stroke: var(--light-gray);

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
  z-index: 1001;
  top: 14px;
  left: 13px;
}

.pin-icon:hover {
  color: var(--daywaves-blue);
  stroke: var(--daywaves-blue);
  transition: 200ms;
}

.zero {
  color: var(--highlight-gray);
  stroke: var(--highlight-gray);
}

.zero:hover {
  color: var(--light-gray);
  stroke: var(--light-gray);
}

.zero:active {
  color: var(--daywaves-blue);
  stroke: var(--daywaves-blue);
  transition: 0ms;
}

.tooltip {
  left: 30px;
}
</style>
