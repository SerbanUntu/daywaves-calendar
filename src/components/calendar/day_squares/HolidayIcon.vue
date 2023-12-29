<script setup lang="ts">
import Tooltip from '../../util/Tooltip.vue';
import IconHoliday from '@/components/icons/IconHoliday24x24.vue';

const props = defineProps({
  count: Number,
});
</script>

<template>
  <div class="holiday-icon">
    <IconHoliday />
    <div class="count-bg" v-if="props.count && props.count > 1"></div>
    <p class="count font-count" v-if="props.count && props.count > 1">{{ props.count }}</p>
  </div>
  <Tooltip text="Holidays" />
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
  left: 62px;
}
</style>