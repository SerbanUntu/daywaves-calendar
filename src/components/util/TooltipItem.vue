<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: "",
  }
});
</script>

<template>
  <article class="tooltip">
    <p class="tooltip-text">
      {{ props.text }}
    </p>
  </article>
</template>

<style scoped>
.tooltip {
  display: inline-flex;
  padding: 6px 10px;
  justify-content: center;
  align-items: center;
  background: #000000;
  border-radius: 25px;
  z-index: 1070;
  position: absolute;
  scale: 0;
}

*:has(> .tooltip):hover .tooltip {
  scale: 1;
  transition: all 200ms cubic-bezier(0.15, 0.7, 0.5, 1);
  transition-delay: 200ms;
}

.tooltip-text {
  color: var(--almost-white);
  text-align: center;
  white-space: nowrap;
}
</style>