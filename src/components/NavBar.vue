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
      <div class="icon-container">
        <div class="icon-background"></div>
        <i>
          <NoteIcon />
        </i>
      </div>
      <div class="icon-container">
        <div class="icon-background"></div>
        <i>
          <TemplatesIcon />
        </i>
      </div>
      <div class="icon-container">
        <div class="icon-background"></div>
        <i>
          <RoutinesIcon />
        </i>
      </div>
      <div class="icon-container">
        <div class="icon-background"></div>
        <i>
          <PinsIcon />
        </i>
      </div>
      <div class="icon-container">
        <div class="icon-background"></div>
        <i>
          <BirthdaysIcon />
        </i>
      </div>
    </div>
    <div class="bottom-icons">
      <div class="icon-container">
        <div class="icon-background"></div>
        <i>
          <AccountIcon />
        </i>
      </div>
      <div class="icon-container">
        <div class="icon-background"></div>
        <i>
          <SettingsIcon />
        </i>
      </div>
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
  gap: 35px;
}

.bottom-icons {
  position: absolute;
  bottom: 0px;
  display: flex;
  width: 100px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 35px;
}

.top-icons,
.bottom-icons {
  padding: 15px;
}

.navbar-background {
  width: 100px;
  height: 1080px;
  border: 1px solid var(--light-gray);
  background: var(--element-gray);
}

.icon-container {
  display: inline-flex;
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.icon-container:hover {
  .icon-background {
    background: var(--highlight-gray);
    transition: 200ms;
  }
}

.icon-container:active {
  i {
    stroke: var(--daywaves-blue);
  }
}

i {
  width: 70px;
  height: 70px;
  z-index: 100;

  stroke: var(--light-gray);
}

.icon-background {
  position: absolute;
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  border-radius: 25px;
  background: var(--element-gray);
  transition: 200ms;
}
</style>