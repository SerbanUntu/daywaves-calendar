<script setup lang="ts">
import ColourVariant from "./data_input/ColourVariant.vue";
import DayVariant from "./data_input/DayVariant.vue";
import Tooltip from "./util/TooltipItem.vue";
import IconGear from "./icons/IconGear20x20.vue";
import IconPlus from "./icons/IconPlus16x16.vue";

const hues: number[] = Array.from({ length: 18 }, (_, index) => index * 20);
</script>

<template>
  <form
    id="data-input"
    class="data-input">
    <section
      id="setup-stage"
      class="setup-stage stage">
      <h1>
        Setup
      </h1>
      <article
        id="setup-content"
        class="setup-content content">
        <section
          id="name-section"
          class="name-section section">
          <label for="name-input">Name:</label>
          <input
            id="name-input"
            name="name"
            maxlength="50">
        </section>
        <section
          id="type-section"
          class="type-section section">
          <label for="type-input">Type:</label>
          <select
            id="type-input"
            name="type">
            <option value="activity">
              Activity
            </option>
            <option value="event">
              Event
            </option>
            <option value="flag">
              Flag
            </option>
            <option value="pin">
              Pin
            </option>
          </select>
        </section>
        <section
          id="colour-section"
          class="colour-section section">
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
    <section
      id="time-date-stage"
      class="time-date-stage stage">
      <h1>
        Time & Date
      </h1>
      <article
        id="time-date-content"
        class="time-date-content content">
        <section
          id="date-section"
          class="date-section section">
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
              placeholder="DD">
            <p class="font-standard-large">
              &nbsp;/&nbsp;
            </p>
            <input
              id="date-m-input"
              name="date-m"
              maxlength="2"
              size="2"
              min="1"
              max="12"
              placeholder="MM">
            <p class="font-standard-large">
              &nbsp;/&nbsp;
            </p>
            <input
              id="date-y-input"
              name="date-y"
              maxlength="4"
              size="4"
              min="1970"
              max="2070"
              placeholder="YYYY">
          </article>
        </section>
        <section
          id="time-section"
          class="time-section section">
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
              placeholder="HH">
            <p class="font-standard-large">
              &nbsp;:&nbsp;
            </p>
            <input
              id="time-m-input"
              name="time-m"
              maxlength="2"
              size="2"
              min="0"
              max="59"
              placeholder="MM">
          </article>
        </section>
        <section
          id="duration-section"
          class="duration-section section">
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
              placeholder="DD">
            <p class="font-standard-large">
              &nbsp;:&nbsp;
            </p>
            <input
              id="duration-h-input"
              name="duration-h"
              maxlength="2"
              size="2"
              min="0"
              max="24"
              placeholder="HH">
            <p class="font-standard-large">
              &nbsp;:&nbsp;
            </p>
            <input
              id="duration-m-input"
              name="duration-m"
              maxlength="2"
              size="2"
              min="0"
              max="59"
              placeholder="MM">
          </article>
        </section>
        <section
          id="repeated-section"
          class="repeated-section section">
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
    <section
      id="links-desc-stage"
      class="links-desc-stage stage">
      <h1>
        Links & Description
      </h1>
      <article
        id="links-desc-content"
        class="links-desc-content content">
        <section
          id="links-section"
          class="links-section section">
          <label for="link-input">Links:</label>
          <input
            id="link-input"
            name="link"
            type="url">
          <article class="add-new-link">
            <i class="plus-icon">
              <IconPlus />
            </i>
            <Tooltip text="Add new link" />
          </article>
        </section>
        <section
          id="description-section"
          class="description-section section">
          <label for="description-input">Description:</label>
          <textarea
            id="description-input"
            name="description" />
        </section>
      </article>
    </section>
  </form>
</template>

<style scoped>
.data-input {
  display: flex;
  height: 220px;
  align-items: center;
  position: absolute;
  bottom: 0px;
  left: 100px;
  right: 0px;
  max-width: 1820px;
  overflow-x: auto;
}

.stage {
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 1px solid var(--light-gray);
  border-bottom: 1px solid var(--light-gray);
  border-right: 1px solid var(--light-gray);
  padding: 10px;
  background: var(--element-gray);

  p {
    color: var(--light-gray);
  }

  label {
    color: var(--light-gray);
    text-align: end;
  }
}

.setup-stage {
  border-radius: 20px 0px 0px 0px;
  width: 455px;

  label {
    width: 60.2px;
  }
}

.time-date-stage {
  width: 455px;
  left: 455px;

  label {
    width: 81.4px;
  }
}

.links-desc-stage {
  border-radius: 0px 20px 0px 0px;
  width: 910px;
  left: 910px;

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
  align-items: center;
  gap: 12px;
}

.colours-container {
  display: flex;
  width: 260px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 10px;
  flex-wrap: wrap;
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

.links-desc-content {
  flex-direction: row;
  gap: 20px;
}

.links-section,
.description-section {
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
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
  display: flex;
  padding: 4px 0px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 20px;
  background: var(--highlight-gray);
  stroke: var(--light-gray);
  cursor: pointer;
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

.tooltip {
  top: 140px;
}

textarea {
  resize: vertical;
  width: 100%;
  max-height: 100%;
}

@media only screen and (max-height: 735px) {
  .data-input {
    left: 13vh;
  }
}
</style>