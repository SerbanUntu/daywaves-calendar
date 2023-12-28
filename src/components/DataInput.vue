<script lang="ts">
import ColourVariant from './ColourVariant.vue'
import DayVariant from './DayVariant.vue';
import Tooltip from './Tooltip.vue';
import IconSettingsLarge from './icons/IconSettingsLarge.vue';

export default {
  components: {
    ColourVariant,
    DayVariant,
    IconSettingsLarge,
    Tooltip,
  },
  data() {
    return {
      hues: Array.from({ length: 18 }, (_, index) => index * 20) // Generating an array [0, 20, 40, ...]
    };
  },
};
</script>

<template>
  <form class="data-input">
    <div id="setup-stage" class="stage">
      <h1>Setup</h1>
      <div id="setup-content" class="content">
        <section id="name-section">
          <label for="name">Name:</label>
          <input id="name" name="name" maxlength="50" />
        </section>
        <section id="type-section">
          <label for="type">Type:</label>
          <select id="type" name="type">
            <option value="activity">Activity</option>
            <option value="event">Event</option>
            <option value="flag">Flag</option>
            <option value="pin">Pin</option>
          </select>
        </section>
        <section id="colour-section">
          <label for="colours-container">Colour:</label>
          <div id="colours-container" name="colours-container">
            <ColourVariant v-for="hue in hues" :hue="hue" />
          </div>
        </section>
      </div>
    </div>
    <div id="time-date-stage" class="stage">
      <h1>Time & Date</h1>
      <div id="time-date-content" class="content">
        <section id="date-section">
          <label for="date-d">Date:</label>
          <div id="date-inputs" name="date-inputs" class="inputs-container">
            <input name="date-d" maxlength="2" size="2" min="1" max="31" placeholder="DD" />
            <p class="font-standard-large">&nbsp;/&nbsp;</p>
            <input name="date-m" maxlength="2" size="2" min="1" max="12" placeholder="MM" />
            <p class="font-standard-large">&nbsp;/&nbsp;</p>
            <input name="date-y" maxlength="4" size="4" min="1970" max="2070" placeholder="YYYY" />
          </div>
        </section>
        <section id="time-section">
          <label for="time-h">Time:</label>
          <div id="time-inputs" name="time-inputs" class="inputs-container">
            <input name="time-h" maxlength="2" size="2" min="0" max="24" placeholder="HH" />
            <p class="font-standard-large">&nbsp;:&nbsp;</p>
            <input name="time-m" maxlength="2" size="2" min="0" max="59" placeholder="MM" />
          </div>
        </section>
        <section id="duration-section">
          <label for="duration-d">Duration:</label>
          <div id="duration-inputs" name="duration-inputs" class="inputs-container">
            <input name="duration-d" maxlength="2" size="2" min="1" max="31" placeholder="DD" />
            <p class="font-standard-large">&nbsp;:&nbsp;</p>
            <input name="duration-h" maxlength="2" size="2" min="0" max="24" placeholder="HH" />
            <p class="font-standard-large">&nbsp;:&nbsp;</p>
            <input name="duration-m" maxlength="2" size="2" min="0" max="59" placeholder="MM" />
          </div>
        </section>
        <section id="repeated-section">
          <label for="day-variant">Repeated:</label>
          <DayVariant name="day-variant" v-for="letter in ['M', 'T', 'W', 'T', 'F', 'S', 'S']" :letter="letter" />
          <i class="settings-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 13C11.6569 13 13 11.6569 13 10C13 8.3431 11.6569 7 10 7C8.3431 7 7 8.3431 7 10C7 11.6569 8.3431 13 10 13Z"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path
                d="M16.6513 8.59393L15.6939 6.28116C15.6939 6.28116 16.9373 5.53612 16.9807 4.75875C17.0343 3.79646 16.198 2.95654 15.2362 3.01366C14.46 3.05975 13.7226 4.3076 13.7226 4.3076L11.3616 3.33627C11.3616 3.33627 11.5211 1.71935 10.8186 1.26857C10.2583 0.90902 9.67617 0.911936 9.11399 1.26857C8.39976 1.72167 8.56283 3.36366 8.56283 3.36366L6.25604 4.3364C6.25604 4.3364 5.54439 3.06917 4.76939 3.01366C3.80841 2.94483 2.98622 3.79574 3.02492 4.75875C3.05646 5.54348 4.2926 6.3196 4.2926 6.3196C3.92442 7.22512 3.34983 8.63834 3.34983 8.63834C3.34983 8.63834 1.74414 8.43299 1.28045 9.12147C0.899792 9.68665 0.913303 10.2925 1.28045 10.8666C1.73736 11.581 3.37478 11.4385 3.37478 11.4385L4.34701 13.7457C4.34701 13.7457 3.08136 14.4552 3.02492 15.2293C2.95484 16.1905 3.80671 17.0129 4.76939 16.9744C5.55583 16.9429 6.3317 15.7007 6.3317 15.7007L8.60461 16.6361C8.60461 16.6361 8.42942 18.2588 9.13056 18.7194C9.69999 19.0936 10.3055 19.0935 10.875 18.7194C11.5761 18.259 11.4023 16.6369 11.4023 16.6369L13.7142 15.6791C14.0996 15.9546 14.4571 16.9304 15.2362 16.9744C16.1981 17.0286 17.0332 16.1916 16.9807 15.2293C16.9381 14.4484 15.6862 13.7018 15.6862 13.7018L16.6439 11.3883C16.6439 11.3883 18.2695 11.5524 18.7251 10.8467C19.0904 10.2807 19.0928 9.68593 18.7252 9.12147C18.2689 8.42109 16.6513 8.59393 16.6513 8.59393Z"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </i>
        </section>
      </div>
    </div>
    <div id="links-desc-stage" class="stage">
      <h1>Links & Description</h1>
      <div id="links-desc-content" class="content">
        <section id="links-section">
          <label for="link">Links:</label>
          <input id="link" name="link" type="url" />
          <div class="add-new-link">
            <i class="plus-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M0 8L16 8" stroke-width="3" />
                <line x1="8.09998" y1="16" x2="8.09998" stroke-width="3" />
              </svg>
            </i>
            <Tooltip text="Add new link" />
          </div>
        </section>
        <section id="description-section">
          <label for="description">Description:</label>
          <textarea id="description" name="description" />
        </section>
      </div>
    </div>
  </form>
</template>

<style scoped>
.data-input {
  display: inline-flex;
  width: calc(100% - 100px);
  height: 240px;
  align-items: center;
  position: absolute;
  bottom: 0px;
  left: 100px;
}

.stage {
  height: 100%;
  position: relative;
  border-top: 1px solid var(--light-gray);
  border-bottom: 1px solid var(--light-gray);
  border-right: 1px solid var(--light-gray);
  background: var(--element-gray);

  p {
    color: var(--light-gray);
  }
}

#setup-stage {
  border-radius: 20px 0px 0px 0px;
  flex-grow: 1;
}

#time-date-stage {
  flex-grow: 1;
}

#links-desc-stage {
  border-radius: 0px 20px 0px 0px;
  flex-grow: 2;
}

h1 {
  position: absolute;
  top: 8px;
  left: 8px;
  white-space: nowrap;
}

.content {
  position: absolute;
  top: 60px;
  left: 10px;

  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 150px;
}

#name-section {
  padding-left: 8px;
}

#type-section {
  padding-left: 17px;
}

section {
  display: flex;
  align-items: center;
  gap: 12px;
}

label {
  color: var(--light-gray);
}

#colours-container {
  display: flex;
  width: 260px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 10px;
  flex-wrap: wrap;
}

#date-section {
  padding-left: 39px;
}

#time-section {
  padding-left: 38px;
}

#duration-section {
  padding-left: 6px;
}

.inputs-container {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.colour-variant,
.day-variant {
  cursor: pointer;
}

.settings-icon {
  height: 20px;
  stroke: var(--light-gray);
}

.settings-icon:hover {
  stroke: var(--daywaves-blue);
  cursor: pointer;
}

#links-desc-content {
  display: flex;
  flex-direction: row;
  width: 889px;
  height: 150px;
  align-items: flex-start;
  gap: 20px;
}

#links-section,
#description-section {
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

#links-section input {
  width: 400px;
  height: 20px;
}

.add-new-link {
  display: flex;
  padding: 2px 0px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 20px;
  background: var(--highlight-gray);
  stroke: var(--light-gray);
  transition: 200ms;
}

.add-new-link:hover {
  background: var(--light-gray);
  stroke: var(--almost-white);
  cursor: pointer;
  transition: 200ms;
}

.add-new-link:active {
  background: var(--daywaves-blue);
  transition: 0ms;
}

.tooltip {
  top: 80px;
}

textarea {
  resize: vertical;
  width: 469px;
  max-height: 127px;
}
</style>