<script setup lang="ts">
import Tooltip from '@/components/util/Tooltip.vue';
import IconNote from '@/components/icons/IconNote24x24.vue';

</script>
<template>
  <article class="note-icon">
    <IconNote />
  </article>
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