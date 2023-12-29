<script setup lang="ts">
import Tooltip from '../../util/Tooltip.vue';
import IconNote from '@/components/icons/IconNote24x24.vue';

</script>
<template>
  <div class="note-icon">
    <IconNote />
  </div>
  <Tooltip text="Daily note" />
</template>

<style scoped>
.note-icon {
  cursor: pointer;
  stroke: var(--light-gray);
  transition: 200ms;
}

.note-icon:hover {
  stroke: var(--daywaves-blue);
  transition: 200ms;
}

.tooltip {
  left: 30px;
}
</style>