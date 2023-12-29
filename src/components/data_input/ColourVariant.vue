<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  hue: Number,
});

const computedColor = computed(() => `hsla(${props.hue}, 40%, 60%, 1)`);
</script>

<template>
  <article :id="'colour-variant-' + hue" class="colour-variant" :style="{ backgroundColor: computedColor }"></article>
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