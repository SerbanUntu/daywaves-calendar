<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  hue: {
    default: 0,
    type: Number
  },
});

const computedColor = computed(() => `hsla(${props.hue}, 40%, 60%, 1)`);
</script>

<template>
  <article
    class="colour-variant"
    :style="{ backgroundColor: computedColor }" />
</template>

<style scoped>
.colour-variant {
  height: 20px;
  width: 20px;
  border-radius: 20px;
}

.colour-variant:hover {
  border: 1px solid white;
}
</style>