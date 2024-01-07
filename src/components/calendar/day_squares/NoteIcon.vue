<script setup lang="ts">
import Tooltip from "@/components/util/TooltipItem.vue";
import IconNote from "@/components/icons/IconNote24x24.vue";
</script>

<template>
  <article class="note-icon">
    <IconNote />
    <Tooltip text="Daily note" />
  </article>
</template>

<style scoped>
.note-icon {
  cursor: pointer;

  width: 24px;
  height: 24px;

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
