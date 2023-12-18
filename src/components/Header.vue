<script setup lang="ts">
</script>

<template>
  <header>
    <img src="../../public/banner.svg" alt="Daywaves logo and text" />
    <div class="week-navigation">
      <div class="week-button">
        <svg class="left-arrow" xmlns="http://www.w3.org/2000/svg" width="15" height="19" viewBox="0 0 15 19" fill="none">
          <path d="M10 9.02124V9.72876L9.43398 9.375L10 9.02124Z" stroke-width="10" />
        </svg>
      </div>
      <div class="week-display">
        <p class="font-menu-title">20 - 26 November 2023</p>
      </div>
      <div class="week-button">
        <svg class="right-arrow" xmlns="http://www.w3.org/2000/svg" width="15" height="19" viewBox="0 0 15 19"
          fill="none">
          <path d="M5 9.72876V9.02124L5.56602 9.375L5 9.72876Z" stroke-width="10" />
        </svg>
      </div>
    </div>
  </header>
</template>
  
<style scoped>
header {
  display: inline-flex;
  width: 100%;
  align-items: center;
  position: absolute;
  top: 0px;
}

.week-navigation {
  height: 65px;
  display: flex;
  align-items: center;
  position: absolute;
  left: calc(50% - 350px);
  gap: 10px;
  background: var(--bg-gray);
}

.week-button {
  width: 80px;
  height: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  background: var(--highlight-gray);
  stroke: var(--light-gray);
  transition: 200ms;
}

.week-display {
  width: 420px;
  height: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  transition: 200ms;

  background: var(--highlight-gray);
}

.week-button,
.week-display {
  cursor: pointer;
}

.week-button:hover,
.week-display:hover {
  background: var(--light-gray);
  stroke: var(--almost-white);
  transition: 200ms;
}

.week-button:active,
.week-display:active {
  background: var(--daywaves-blue);
  transition: 0ms;
}

.left-arrow {
  position: relative;
  left: -2px;
}

.right-arrow {
  position: relative;
  right: -2px;
}
</style>