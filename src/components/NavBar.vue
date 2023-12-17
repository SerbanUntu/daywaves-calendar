<script setup lang="ts">
import NoteIcon from './icons/IconNoteLarge.vue'
import TemplatesIcon from './icons/IconTemplatesLarge.vue'
import RoutinesIcon from './icons/IconRoutinesLarge.vue'
import PinsIcon from './icons/IconPinsLarge.vue'
import BirthdaysIcon from './icons/IconBirthdaysLarge.vue'
import AccountIcon from './icons/IconAccountLarge.vue'
import SettingsIcon from './icons/IconSettingsLarge.vue'
</script>

<template>
  <nav>
    <div class="top-icons">
      <NoteIcon class="icon" />
      <TemplatesIcon class="icon" />
      <RoutinesIcon class="icon" />
      <PinsIcon class="icon" />
      <BirthdaysIcon class="icon" />
    </div>
    <div class="bottom-icons">
      <AccountIcon class="icon" />
      <SettingsIcon class="icon" />
    </div>
    <div class="navbar-background"></div>
  </nav>
</template>

<style scoped>
nav {
  display: inline-flex;
  align-items: flex-start;
}

.top-icons {
  position: absolute;
  display: flex;
  width: 100px;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.bottom-icons {
  position: absolute;
  bottom: 0px;
  display: flex;
  width: 100px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
}

.navbar-background {
  width: 100px;
  height: 1080px;
  border: 1px solid var(--light-gray);
  background: var(--element-gray);
}

.icon {
  display: flex;
  width: 100px;
  height: 100px;
  padding: 15px;
  justify-content: center;
  align-items: center;
}
</style>
