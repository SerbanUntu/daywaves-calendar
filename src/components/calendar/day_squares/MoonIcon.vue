<script setup lang="ts">
import Tooltip from "@/components/util/TooltipItem.vue";
import IconMoon from "@/components/icons/IconMoon20x20.vue";
</script>

<template>
  <article class="moon-icon">
    <IconMoon />
    <Tooltip text="Moon data" />
  </article>
</template>

<style scoped>
.moon-icon {
  width: 24px;
  height: 24px;
  padding: 2px;
  cursor: pointer;
  position: relative;
}

.moon-icon * {
  position: absolute;
}

.tooltip {
  top: -2px;
  left: 30px;
}
</style>
