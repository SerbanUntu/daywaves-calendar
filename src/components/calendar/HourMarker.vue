<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  hour: {
    default: "0",
    type: String
  },
  isHalf: {
    default: false,
    type: Boolean
  },
  pm: {
    default: false,
    type: Boolean
  }
});

const computedColour = computed(() =>
  props.isHalf
    ? "var(--light-gray)"
    : props.pm
      ? "var(--intense-red)"
      : "var(--almost-white)"
);
</script>

<template>
  <section class="hour-marker">
    <p
      :class="{ 'font-standard-small': isHalf }"
      :style="{ color: computedColour }">
      {{ props.hour }}
    </p>
    <article class="marker" :style="{ background: computedColour }" />
  </section>
</template>

<style scoped>
.hour-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 26px;
  height: 22px;
  opacity: 0.8;
}

.marker {
  width: 2px;
  height: 5px;
  flex-shrink: 0;
}
</style>
