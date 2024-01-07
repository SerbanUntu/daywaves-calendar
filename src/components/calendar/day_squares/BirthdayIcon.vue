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
  cursor: pointer;

  position: relative;

  width: 29px;
  height: 24px;

  color: var(--light-gray);

  stroke: var(--light-gray);

  transition: 200ms;
}

.birthday-icon * {
  position: absolute;
}

.count-bg {
  z-index: 1000;
  top: 14px;
  left: 13px;

  width: 16px;
  height: 10px;

  background: var(--element-gray);
}

.large-count {
  top: 10px;
  font-size: 16px;
}

p {
  z-index: 1001;
  top: 14px;
  left: 13px;
}

.birthday-icon:hover {
  color: var(--daywaves-blue);
  stroke: var(--daywaves-blue);
  transition: 200ms;
}

.zero {
  color: var(--highlight-gray);
  stroke: var(--highlight-gray);
}

.zero:hover {
  color: var(--light-gray);
  stroke: var(--light-gray);
}

.zero:active {
  color: var(--daywaves-blue);
  stroke: var(--daywaves-blue);
  transition: 0ms;
}

.tooltip {
  top: 2px;
  left: 30px;
}
</style>
