<script setup lang="ts">
import NoteIcon from './icons/IconNote70x70.vue'
import TemplatesIcon from './icons/IconTemplates70x70.vue'
import RoutinesIcon from './icons/IconRoutines70x70.vue'
import PinsIcon from './icons/IconPins70x70.vue'
import BirthdaysIcon from './icons/IconBirthdays70x70.vue'
import AccountIcon from './icons/IconAccount70x70.vue'
import SettingsIcon from './icons/IconSettings70x70.vue'
import Tooltip from './util/Tooltip.vue'
</script>

<template>
  <nav id="navbar">
    <div id="navbar-top-icons" class="top-icons">
      <div id="navbar-note-icon-container" class="icon-container">
        <i>
          <NoteIcon />
        </i>
        <Tooltip text="Open today's daily note" />
      </div>
      <div id="navbar-templates-icon-container" class="icon-container">
        <i>
          <TemplatesIcon />
        </i>
        <Tooltip text="Templates" />
      </div>
      <div id="navbar-routines-icon-container" class="icon-container">
        <i>
          <RoutinesIcon />
        </i>
        <Tooltip text="Routines" />
      </div>
      <div id="navbar-pins-icon-container" class="icon-container">
        <i>
          <PinsIcon />
        </i>
        <Tooltip text="Pins" />
      </div>
      <div id="navbar-birthdays-icon-container" class="icon-container">
        <i>
          <BirthdaysIcon />
        </i>
        <Tooltip text="Birthdays" />
      </div>
    </div>
    <div id="navbar-bottom-icons" class="bottom-icons">
      <div id="navbar-account-icon-container" class="icon-container">
        <i>
          <AccountIcon />
        </i>
        <Tooltip text="Account" />
      </div>
      <div id="navbar-settings-icon-container" class="icon-container">
        <i>
          <SettingsIcon />
        </i>
        <Tooltip text="Settings" />
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: inline-flex;
  align-items: flex-start;
  position: absolute;
  top: 0px;
  height: 100%;
  width: 100px;
  z-index: 1040;
  border: 1px solid var(--light-gray);
  background: var(--element-gray);
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

.icon-container {
  display: inline-flex;
  width: 70px;
  height: 70px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: var(--element-gray);
  transition: 200ms;
}

.icon-container:hover {
  background: var(--highlight-gray);
  transition: 200ms;
}

.icon-container:active {
  i {
    stroke: var(--daywaves-blue);
  }
}

i {
  width: 70px;
  height: 70px;
  z-index: 1040;
  stroke: var(--light-gray);
}

.tooltip {
  left: 110px;
}
</style>