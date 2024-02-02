<script setup lang="ts">
const props = defineProps({
  msg: {
    default: "This page has not yet been implemented.",
    type: String
  }
});
</script>

<template>
  <div id="placeholder-menu" class="placeholder-menu">
    <h1>Not implemented</h1>
    <p>{{ props.msg }}</p>
    <div class="go-back-button" @click="$router.push('/')">
      <p>Back</p>
    </div>
  </div>
</template>

<style scoped>
.placeholder-menu {
  position: relative;
  inset: 0 0 0 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 20px;

  text-align: center;
}

.go-back-button {
  cursor: pointer;

  margin: 20px;
  padding: 20px;

  text-align: center;

  background-color: var(--element-gray);
  border-radius: 20px;

  transition: 200ms;
}

.go-back-button:hover {
  background-color: var(--highlight-gray);
  transition: 200ms;
}

.go-back-button:active {
  background-color: var(--daywaves-blue);
  transition: 0ms;
}
</style>
