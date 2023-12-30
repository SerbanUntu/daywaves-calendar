<script setup lang="ts">
import Tooltip from '@/components/util/Tooltip.vue';
import { ref } from 'vue';

let isHovered = ref<boolean>(false);

</script>

<template>
  <article class="earth-icon" @mouseover="isHovered = true" @mouseout="isHovered = false">
    <img src="../../../assets/images/GlobeVectorGray.png" v-if="!isHovered" alt="Gray icon of the globe" />
    <img src="../../../assets/images/GlobeVectorBlue.png" v-else alt="Blue icon of the globe" />
  </article>
  <Tooltip text="Earth data" />
</template>

<style scoped>
.earth-icon {
  cursor: pointer;
}

.tooltip {
  left: 30px;
}
</style>