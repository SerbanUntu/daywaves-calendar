<script setup lang="ts">
import Tooltip from "@/components/util/TooltipItem.vue";
import IconBirthday from "@/components/icons/IconBirthday24x24.vue";

const props = defineProps({
  count: {
    default: 1,
    type: Number
  }
});
</script>

<template>
  <article :class="{ 'birthday-icon': true, zero: count == 0 }">
    <IconBirthday />
    <section v-if="props.count != undefined" class="count-bg" />
    <p v-if="props.count && props.count > 1" class="font-count">
      {{ props.count }}
    </p>
    <p v-else class="large-count font-count">+</p>
    <Tooltip text="Birthdays" />
  </article>
</template>

<style scoped>
.birthday-icon {
  width: 29px;
  height: 24px;
  position: relative;
  cursor: pointer;
  stroke: var(--light-gray);
  color: var(--light-gray);
  transition: 200ms;
}

.birthday-icon * {
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

.large-count {
  top: 10px;
  font-size: 16px;
}

p {
  left: 13px;
  top: 14px;
  z-index: 1001;
}

.birthday-icon:hover {
  stroke: var(--daywaves-blue);
  color: var(--daywaves-blue);
  transition: 200ms;
}

.zero {
  stroke: var(--highlight-gray);
  color: var(--highlight-gray);
}

.zero:hover {
  stroke: var(--light-gray);
  color: var(--light-gray);
}

.zero:active {
  stroke: var(--daywaves-blue);
  color: var(--daywaves-blue);
  transition: 0ms;
}

.tooltip {
  top: 2px;
  left: 30px;
}
</style>
