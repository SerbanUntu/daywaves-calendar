<script setup lang="ts">
import Tooltip from "@/components/util/TooltipItem.vue";
import { ref } from "vue";

let isHovered = ref<boolean>(false);
</script>

<template>
  <article
    class="earth-icon"
    @mouseover="isHovered = true"
    @mouseout="isHovered = false">
    <img
      v-if="!isHovered"
      src="../../../assets/images/GlobeVectorGray.png"
      alt="Gray icon of the globe"
      fetchpriority="low" />
    <img
      v-else
      src="../../../assets/images/GlobeVectorBlue.png"
      alt="Blue icon of the globe"
      fetchpriority="low" />
    <Tooltip text="Earth data" />
  </article>
</template>

<style scoped>
.earth-icon {
  cursor: pointer;
}

.tooltip {
  left: 30px;
}
</style>
