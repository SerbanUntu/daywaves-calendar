<script setup lang="ts">

const props = defineProps({
  letter: String,
});

</script>

<template>
  <article class="day-variant">
    <p class="font-standard-small">{{ props.letter }}</p>
  </article>
</template>

<style scoped>
.day-variant {
  height: 20px;
  width: 20px;
  border-radius: 20px;
  border: 1px solid var(--light-gray);
  display: flex;
  align-items: center;
  justify-content: center;
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