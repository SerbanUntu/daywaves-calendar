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
    <section id="navbar-top-icons" class="top-icons">
      <article id="navbar-note-icon-container" class="icon-container">
        <i>
          <NoteIcon class="icon-svg" />
        </i>
        <Tooltip text="Open today's daily note" />
      </article>
      <article id="navbar-templates-icon-container" class="icon-container">
        <i>
          <TemplatesIcon class="icon-svg" />
        </i>
        <Tooltip text="Templates" />
      </article>
      <article id="navbar-routines-icon-container" class="icon-container">
        <i>
          <RoutinesIcon class="icon-svg" />
        </i>
        <Tooltip text="Routines" />
      </article>
      <article id="navbar-pins-icon-container" class="icon-container">
        <i>
          <PinsIcon class="icon-svg" />
        </i>
        <Tooltip text="Pins" />
      </article>
      <article id="navbar-birthdays-icon-container" class="icon-container">
        <i>
          <BirthdaysIcon class="icon-svg" />
        </i>
        <Tooltip text="Birthdays" />
      </article>
    </section>
    <section id="navbar-bottom-icons" class="bottom-icons">
      <article id="navbar-account-icon-container" class="icon-container">
        <i>
          <AccountIcon class="icon-svg" />
        </i>
        <Tooltip text="Account" />
      </article>
      <article id="navbar-settings-icon-container" class="icon-container">
        <i>
          <SettingsIcon class="icon-svg" />
        </i>
        <Tooltip text="Settings" />
      </article>
    </section>
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
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 35px;
}

.bottom-icons {
  position: absolute;
  bottom: 0px;
  display: flex;
  width: 100%;
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
  width: 100%;
  height: 100%;
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
  z-index: 1040;
  stroke: var(--light-gray);
}

.icon-svg {
  width: 100%;
  height: 100%;
}

.tooltip {
  left: 110px;
}

@media only screen and (min-height: 735px) {
  #navbar-birthdays-icon-container {
    .tooltip {
      top: 465px;
    }
  }
}

@media only screen and (max-height: 735px) {
  nav {
    width: 13vh;
  }

  .top-icons,
  .bottom-icons {
    padding: 2vh;
    gap: 2vh;
  }

  .tooltip {
    left: 13vh;
  }
}
</style>