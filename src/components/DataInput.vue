<script lang="ts">
import ColourVariant from './ColourVariant.vue'

export default {
  components: {
    ColourVariant,
  },
  data() {
    return {
      hues: Array.from({ length: 18 }, (_, index) => index * 20) // Generating an array [0, 20, 40, ...]
    };
  },
};
</script>

<template>
  <div class="data-input">
    <div id="setup-stage" class="stage">
      <h1>Setup</h1>
      <div id="setup-content" class="content">
        <section id="name-section">
          <label>Name:</label>
          <input />
        </section>
        <section id="type-section">
          <label>Type:</label>
          <input />
        </section>
        <section id="colour-section">
          <label>Colour:</label>
          <div id="colours-container">
            <ColourVariant v-for="hue in hues" :hue="hue" />
          </div>
        </section>
      </div>
    </div>
    <div id="time-date-stage" class="stage">
      <h1>Time & Date</h1>
      <div id="time-date-content" class="content"></div>
    </div>
    <div id="links-desc-stage" class="stage">
      <h1>Links & Description</h1>
      <div id="links-desc-content" class="content"></div>
    </div>
  </div>
</template>

<style scoped>
.data-input {
  display: inline-flex;
  width: calc(100% - 100px);
  /* TODO Improve this */
  height: 240px;
  align-items: center;
  position: absolute;
  bottom: 0px;
  left: 100px;

  border-radius: 20px 20px 0px 0px;
  border-top: 1px solid var(--light-gray);
  border-bottom: 1px solid var(--light-gray);
  border-right: 1px solid var(--light-gray);
  background: var(--element-gray);
}

.stage {
  height: 100%;
  position: relative;
}

#setup-stage,
#time-date-stage {
  border-right: 1px solid var(--light-gray);
  flex-grow: 1;
}

#links-desc-stage {
  flex-grow: 2;
}

h1 {
  position: absolute;
  top: 8px;
  left: 8px;
  white-space: nowrap;
}

#setup-content {
  position: absolute;
  top: 57.5px;
  left: 10px;

  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
}

#name-section {
  padding-left: 8px;
}

#type-section {
  padding-left: 17px;
}

section {
  display: flex;
  align-items: flex-start;
  gap: 14px;
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
</style>