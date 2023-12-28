<script setup lang="ts">
const props = defineProps({
  count: Number,
});
</script>

<template>
  <div class="holiday-icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 10H9.72076L9.94868 9.31623L12 3.16228L14.0513 9.31623L14.2792 10H15H21.1492L15.8753 14.2191L15.3308 14.6547L15.5513 15.3162L17.4805 21.1038L12.6247 17.2191L12 16.7194L11.3753 17.2191L6.5195 21.1038L8.44868 15.3162L8.66918 14.6547L8.12469 14.2191L2.85078 10H9Z"
        stroke="#585858" stroke-width="2" />
    </svg>
    <div class="count-bg" v-if="props.count && props.count > 1"></div>
    <p class="count font-count" v-if="props.count && props.count > 1">{{ props.count }}</p>
  </div>
</template>

<style scoped>
.holiday-icon {
  width: 29px;
  height: 24px;
  position: relative;
}

.holiday-icon * {
  position: absolute;
}

.count-bg {
  left: 13px;
  top: 14px;
  width: 16px;
  height: 10px;
  background: var(--element-gray);
  z-index: 1000;
}

p {
  color: var(--light-gray);
  left: 13px;
  top: 14px;
  font-style: normal;
  z-index: 1001;
}
</style>