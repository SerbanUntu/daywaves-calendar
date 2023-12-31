<script setup lang="ts">
import Tooltip from "@/components/util/TooltipItem.vue";
import IconMoon from "@/components/icons/IconMoon20x20.vue";

</script>
<template>
  <article class="moon-icon">
    <IconMoon />
  </article>
  <Tooltip text="Moon data" />
</template>

<style scoped>
.moon-icon {
  width: 24px;
  height: 24px;
  padding: 2px;
  cursor: pointer;
}

.tooltip {
  left: 30px;
}
</style>