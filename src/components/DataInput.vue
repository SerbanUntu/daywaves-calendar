<script setup lang="ts">
import ColourVariant from "./data_input/ColourVariant.vue";
import DayVariant from "./data_input/DayVariant.vue";
import Tooltip from "./util/TooltipItem.vue";
import IconGear from "./icons/IconGear20x20.vue";
import IconPlus from "./icons/IconPlus16x16.vue";
import TemplatesIcon from "./icons/IconTemplates70x70.vue";
import ImportArrowIcon from "./icons/IconImportArrow33x24.vue";
import PlusIcon from "./icons/IconPlus16x16.vue";
import { ref } from "vue";

enum DataInputEvent {
  None,
  Edit,
  Create
}

const hues: number[] = Array.from({ length: 18 }, (_, index) => index * 20);
let formState = ref<DataInputEvent>(DataInputEvent.None);
</script>

<template>
  <article id="data-input-container" class="data-input-container">
    <section
      v-if="formState === DataInputEvent.None"
      id="data-input-selection"
      class="data-input-selection">
      <section
        id="selection-buttons-container"
        class="selection-buttons-container">
        <article
          id="add-activity-button"
          class="selection-button"
          @click="formState = DataInputEvent.Create">
          <section id="plus-icon-container" class="plus-icon-container">
            <article id="vertical-line" class="vertical-line"></article>
            <article id="horizontal-line" class="horizontal-line"></article>
          </section>
          <Tooltip text="Add an activity" />
        </article>
        <article id="create-from-template-button" class="selection-button">
          <TemplatesIcon />
          <section class="cover"></section>
          <ImportArrowIcon class="icon import-arrow-icon" />
          <Tooltip text="Create from template" />
        </article>
        <article id="create-template-button" class="selection-button">
          <TemplatesIcon />
          <section class="cover"></section>
          <PlusIcon class="icon plus-icon" />
          <Tooltip text="Create new template" />
        </article>
      </section>
    </section>
    <form
      v-if="formState !== DataInputEvent.None"
      id="data-input"
      class="data-input">
      <section id="setup-stage" class="setup-stage stage">
        <h1>Setup</h1>
        <article id="setup-content" class="setup-content content">
          <section id="name-section" class="name-section section">
            <label for="name-input">Name:</label>
            <input id="name-input" name="name" maxlength="50" />
          </section>
          <section id="type-section" class="type-section section">
            <label for="type-input">Type:</label>
            <select id="type-input" name="type">
              <option value="activity">Activity</option>
              <option value="event">Event</option>
              <option value="flag">Flag</option>
              <option value="pin">Pin</option>
            </select>
          </section>
          <section id="colour-section" class="colour-section section">
            <label for="colour-variant-0">Colour:</label>
            <article
              id="colours-container"
              name="colours-container"
              class="colours-container">
              <ColourVariant
                v-for="(hue, index) in hues"
                :id="'colour-variant-' + hue"
                :key="index"
                :hue="hue" />
            </article>
          </section>
        </article>
      </section>
      <section id="time-date-stage" class="time-date-stage stage">
        <h1>Time & Date</h1>
        <article id="time-date-content" class="time-date-content content">
          <section id="date-section" class="date-section section">
            <label for="date-d-input">Date:</label>
            <article
              id="date-inputs"
              name="date-inputs"
              class="date-inputs inputs-container">
              <input
                id="date-d-input"
                name="date-d"
                maxlength="2"
                size="2"
                min="1"
                max="31"
                placeholder="DD" />
              <p class="font-standard-large">&nbsp;/&nbsp;</p>
              <input
                id="date-m-input"
                name="date-m"
                maxlength="2"
                size="2"
                min="1"
                max="12"
                placeholder="MM" />
              <p class="font-standard-large">&nbsp;/&nbsp;</p>
              <input
                id="date-y-input"
                name="date-y"
                maxlength="4"
                size="4"
                min="1970"
                max="2070"
                placeholder="YYYY" />
            </article>
          </section>
          <section id="time-section" class="time-section section">
            <label for="time-h-input">Time:</label>
            <article
              id="time-inputs"
              name="time-inputs"
              class="time-inputs inputs-container">
              <input
                id="time-h-input"
                name="time-h"
                maxlength="2"
                size="2"
                min="0"
                max="24"
                placeholder="HH" />
              <p class="font-standard-large">&nbsp;:&nbsp;</p>
              <input
                id="time-m-input"
                name="time-m"
                maxlength="2"
                size="2"
                min="0"
                max="59"
                placeholder="MM" />
            </article>
          </section>
          <section id="duration-section" class="duration-section section">
            <label for="duration-d-input">Duration:</label>
            <article
              id="duration-inputs"
              name="duration-inputs"
              class="duration-inputs inputs-container">
              <input
                id="duration-d-input"
                name="duration-d"
                maxlength="2"
                size="2"
                min="1"
                max="31"
                placeholder="DD" />
              <p class="font-standard-large">&nbsp;:&nbsp;</p>
              <input
                id="duration-h-input"
                name="duration-h"
                maxlength="2"
                size="2"
                min="0"
                max="24"
                placeholder="HH" />
              <p class="font-standard-large">&nbsp;:&nbsp;</p>
              <input
                id="duration-m-input"
                name="duration-m"
                maxlength="2"
                size="2"
                min="0"
                max="59"
                placeholder="MM" />
            </article>
          </section>
          <section id="repeated-section" class="repeated-section section">
            <label for="day-variant-0">Repeated:</label>
            <DayVariant
              v-for="(letter, index) in ['M', 'T', 'W', 'T', 'F', 'S', 'S']"
              :id="'day-variant-' + index"
              :key="index"
              name="day-variant"
              :letter="letter" />
            <i class="settings-icon">
              <IconGear />
            </i>
          </section>
        </article>
      </section>
      <section id="links-desc-stage" class="links-desc-stage stage">
        <h1>Links & Description</h1>
        <article id="links-desc-content" class="links-desc-content content">
          <section id="links-section" class="links-section section">
            <label for="link-input">Links:</label>
            <input id="link-input" name="link" type="url" />
            <article class="add-new-link">
              <i class="plus-icon">
                <IconPlus />
              </i>
              <Tooltip text="Add new link" />
            </article>
          </section>
          <section id="description-section" class="description-section section">
            <label for="description-input">Description:</label>
            <textarea id="description-input" name="description" />
          </section>
          <input
            id="submit-button"
            class="submit-button"
            type="submit"
            value="Submit" />
        </article>
      </section>
    </form>
  </article>
</template>

<style scoped>
.data-input-container {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 100px;

  overflow: auto hidden;

  max-width: 1820px;
  height: 220px;

  background: none;
}

.data-input-selection {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  padding: 55px;

  background: var(--element-gray);
  border-top: 1px solid var(--light-gray);
  border-right: 1px solid var(--light-gray);
  border-bottom: 1px solid var(--light-gray);
  border-radius: 20px 20px 0 0;
}

.selection-buttons-container {
  position: absolute;

  display: flex;
  flex-direction: row;
  gap: 2vw;
  align-items: center;
  justify-content: center;
}

.selection-button {
  cursor: pointer;

  position: relative;

  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 100px;
  height: 100px;

  background: var(--element-gray);
  border: 3px solid var(--light-gray);
  border-radius: 75px;

  stroke: var(--light-gray);

  transition: 200ms;
}

.plus-icon-container {
  width: 42px;
  height: 42px;
}

.vertical-line {
  position: relative;
  left: 19.5px;

  width: 3px;
  height: 42px;

  background: var(--light-gray);

  transition: 200ms;
}

.horizontal-line {
  position: relative;
  top: -22.5px;

  width: 42px;
  height: 3px;

  background: var(--light-gray);

  transition: 200ms;
}

.cover {
  position: absolute;
  top: 50px;
  left: 56px;

  width: 21px;
  height: 21px;

  background: var(--element-gray);

  transition: 200ms;
}

.icon {
  position: absolute;
}

.import-arrow-icon {
  top: 52px;
  left: 50px;
}

.plus-icon {
  top: 54px;
  left: 60px;
  width: 20px;
  height: 20px;
}

.selection-button:hover {
  background: var(--highlight-gray);

  .cover {
    background: var(--highlight-gray);
    transition: 200ms;
  }

  transition: 200ms;
}

.selection-button:active {
  border: 3px solid var(--daywaves-blue);

  .vertical-line,
  .horizontal-line {
    background: var(--daywaves-blue);
    transition: 0ms;
  }

  stroke: var(--daywaves-blue);
  transition: 0ms;
}

.data-input {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

.stage {
  position: absolute;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
  padding: 10px;

  background: var(--element-gray);
  border-top: 1px solid var(--light-gray);
  border-right: 1px solid var(--light-gray);
  border-bottom: 1px solid var(--light-gray);

  p {
    color: var(--light-gray);
  }

  label {
    color: var(--light-gray);
    text-align: end;
  }
}

.setup-stage {
  width: 455px;
  border-radius: 20px 0 0;

  label {
    width: 60.2px;
  }
}

.time-date-stage {
  left: 455px;
  width: 455px;

  label {
    width: 81.4px;
  }
}

.links-desc-stage {
  left: 910px;
  width: 910px;
  border-radius: 0 20px 0 0;

  label {
    text-align: start;
  }
}

h1 {
  white-space: nowrap;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  height: 150px;
}

.section {
  display: flex;
  gap: 12px;
  align-items: center;
}

.colours-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-content: flex-start;
  align-items: flex-start;

  width: 260px;
}

.inputs-container {
  display: flex;
  flex-direction: row;
  align-items: center;
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
  cursor: pointer;
  stroke: var(--daywaves-blue);
}

.links-desc-content {
  flex-direction: row;
  gap: 20px;
}

.links-section,
.description-section {
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;

  width: 100%;
  height: 100%;
}

.links-section {
  input {
    width: 100%;
  }

  i {
    height: 16px;
  }
}

.add-new-link {
  cursor: pointer;

  display: flex;
  align-items: center;
  align-self: stretch;
  justify-content: center;

  padding: 4px 0;

  background: var(--highlight-gray);
  border-radius: 20px;

  stroke: var(--light-gray);

  transition: 200ms;
}

.add-new-link:hover {
  background: var(--light-gray);
  stroke: var(--almost-white);
  transition: 200ms;
}

.add-new-link:active {
  background: var(--daywaves-blue);
  transition: 0ms;
}

.data-input .tooltip {
  top: 140px;
}

.data-input-selection .tooltip {
  top: 105px;
}

textarea {
  resize: vertical;
  width: 100%;
  max-height: 100%;
}

.submit-button {
  cursor: pointer;

  position: absolute;
  z-index: 1030;
  top: 10px;
  right: 10px;

  padding: 10px;

  background: var(--element-gray);
  border-radius: 10px;

  transition: 200ms;
}

.submit-button:hover {
  background: var(--highlight-gray);
  transition: 200ms;
}

@media only screen and (height <= 735px) {
  .data-input-container {
    left: 13vh;
  }
}
</style>
