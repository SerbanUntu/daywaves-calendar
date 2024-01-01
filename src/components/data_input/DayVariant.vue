<script setup lang="ts">
const props = defineProps({
  letter: {
    default: "M",
    type: String
  }
});
</script>

<template>
  <article class="day-variant">
    <p class="font-standard-small">
      {{ props.letter }}
    </p>
  </article>
</template>

<style scoped>
.day-variant {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;

  border: 1px solid var(--light-gray);
  border-radius: 20px;
}

p {
  color: var(--light-gray);
}

.day-variant:hover {
  border: 1px solid var(--daywaves-blue);

  p {
    color: var(--daywaves-blue);
  }
}
</style>
