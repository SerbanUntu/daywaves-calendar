<script setup lang="ts">
defineProps(['text']);
</script>

<template>
  <div class="tooltip-container">
    <p class="tooltip-text">{{ text }}</p>
  </div>
</template>

<style scoped>
.tooltip-container {
  display: inline-flex;
  padding: 6px 10px;
  justify-content: center;
  align-items: center;
  background: #000000;
  border-radius: 25px;
}

.tooltip-text {
  color: var(--almost-white);
  text-align: center;
  white-space: nowrap;
}
</style>