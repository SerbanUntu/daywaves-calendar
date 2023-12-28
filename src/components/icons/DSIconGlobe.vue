<script setup lang="ts">
import Tooltip from '../Tooltip.vue';
import { ref } from 'vue';

let isHovered = ref<boolean>(false);

</script>

<template>
  <div class="earth-icon" @mouseover="isHovered = true" @mouseout="isHovered = false">
    <img src="../../assets/images/GlobeVectorGray.png" v-if="!isHovered" />
    <img src="../../assets/images/GlobeVectorBlue.png" v-else />
  </div>
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