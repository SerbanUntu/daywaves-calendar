<script setup lang="ts">

const props = defineProps({
  date: Number,
  day: String,
});


</script>

<template>
  <div class="day-square">
    <div class="text-container">
      <p class="date font-standard-xl">{{ props.date }}</p>
      <p class="day font-standard-xl">{{ props.day }}</p>
    </div>
  </div>
</template>

<style scoped>
.day-square {
  width: 100px;
  height: 100px;
  background: var(--element-gray);
}

.text-container {
  position: relative;
  top: 5px;
  left: 5px;
}

.day {
  color: var(--light-gray);
}
</style>