<script setup lang="ts">
import DayVariant from "./data_input/DayVariant.vue";
import Tooltip from "./util/TooltipItem.vue";
import IconGear from "./icons/IconGear20x20.vue";
import IconPlus from "./icons/IconPlus16x16.vue";
import TemplatesIcon from "./icons/IconTemplates70x70.vue";
import ImportArrowIcon from "./icons/IconImportArrow33x24.vue";
import PlusIcon from "./icons/IconPlus16x16.vue";
import CancelIcon from "./icons/IconCancel16x16.vue";
import DeleteIcon from "./icons/IconDelete12x16.vue";
import EditIcon from "./icons/IconEdit16x16.vue";
import SaveIcon from "./icons/IconSave16x16.vue";
import { computed, ref } from "vue";
import { ActivityType, DataInputEvent, type Link } from "@/stores/Activities";
import { useActivitiesStore } from "@/stores/Activities";
import { storeToRefs } from "pinia";

const store = useActivitiesStore();

const { formState, clickedActivity } = storeToRefs(store);

const hues: number[] = Array.from({ length: 18 }, (_, index) => index * 20);
let dataInputValid = computed(() => {
  const durationMinutes: number =
    Number(inputDurationH.value) * 60 + Number(inputDurationM.value);
  return (
    inputName.value &&
    inputHue.value != undefined &&
    inputDateD.value &&
    inputDateM.value &&
    inputDateY.value &&
    inputTimeH.value &&
    inputTimeM.value &&
    inputDurationM.value &&
    inputDurationH.value &&
    inputDateY.value >= 1970 &&
    inputDateY.value <= 2070 &&
    !isNaN(
      new Date(
        `${inputDateY.value}-${inputDateM.value}-${inputDateD.value}T${inputTimeH.value}:${inputTimeM.value}Z`
      ).getTime()
    ) &&
    inputDurationH.value < 24 &&
    inputDurationM.value < 60 &&
    (inputDurationH.value > 0 ||
      (inputDurationH.value == 0 && inputDurationM.value > 0)) &&
    inputDurationM.value >= 0 &&
    durationMinutes +
      Number(inputTimeH.value) * 60 +
      Number(inputTimeM.value) <=
      1440 &&
    durationMinutes >= 10 &&
    editedLinkIndex.value == -1
  );
});

let inputName = ref<string | undefined>();
let inputType = ref<ActivityType>(ActivityType.ACTIVITY);
let inputHue = ref<number | undefined>();
let inputDateD = ref<number | undefined>();
let inputDateM = ref<number | undefined>();
let inputDateY = ref<number | undefined>();
let inputTimeH = ref<number | undefined>();
let inputTimeM = ref<number | undefined>();
let inputDurationD = ref<number | undefined>();
let inputDurationH = ref<number | undefined>();
let inputDurationM = ref<number | undefined>();
let inputLinks = ref<Link[] | undefined>();
let currentLink = ref<Link>({ name: "", address: "" });
let editedLinkIndex = ref<number>(-1);
let linkCreated = ref<boolean>(false);
let inputDescription = ref<string>();
let savedLinks: Link[] = [];
let check: boolean = false;

setInterval(() => {
  if (formState.value === DataInputEvent.EDIT && check === false) {
    if (clickedActivity.value) {
      inputName.value = clickedActivity.value.getName();
      inputType.value = clickedActivity.value.getType();
      inputHue.value = clickedActivity.value.getHue();
      inputDateD.value = clickedActivity.value.getDateD();
      inputDateM.value = clickedActivity.value.getDateM();
      inputDateY.value = clickedActivity.value.getDateY();
      inputTimeH.value = clickedActivity.value.getTimeH();
      inputTimeM.value = clickedActivity.value.getTimeM();
      inputDurationH.value = clickedActivity.value.getDurationH();
      inputDurationM.value = clickedActivity.value.getDurationM();
      inputLinks.value = clickedActivity.value.getLinks();
      saveLinks();
      inputDescription.value = clickedActivity.value.getDescription();
      check = true;
    }
  }
  if (formState.value !== DataInputEvent.EDIT) {
    check = false;
  }
}, 1);

function resetInputs() {
  inputName.value = undefined;
  inputHue.value = undefined;
  inputDateD.value = undefined;
  inputDateM.value = undefined;
  inputDateY.value = undefined;
  inputTimeH.value = undefined;
  inputTimeM.value = undefined;
  inputDurationD.value = undefined;
  inputDurationH.value = undefined;
  inputDurationM.value = undefined;
  inputLinks.value = undefined;
  inputDescription.value = undefined;
  currentLink.value = { name: "", address: "" };
  editedLinkIndex.value = -1;
  linkCreated.value = false;
  savedLinks = [];
}

function saveLinks() {
  savedLinks = [];
  inputLinks.value?.forEach((link) => {
    savedLinks.push({ name: link.name, address: link.address });
  });
}
</script>

<template>
  <article id="data-input-container" class="data-input-container">
    <section
      v-if="formState === DataInputEvent.NONE"
      id="data-input-selection"
      class="data-input-selection">
      <section
        id="selection-buttons-container"
        class="selection-buttons-container">
        <article
          id="add-activity-button"
          class="selection-button"
          @click="
            () => {
              formState = DataInputEvent.CREATE;
              resetInputs();
            }
          ">
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
      v-if="formState !== DataInputEvent.NONE"
      id="data-input"
      class="data-input">
      <section id="setup-stage" class="setup-stage stage">
        <h1>Setup</h1>
        <article id="setup-content" class="setup-content content">
          <section id="name-section" class="name-section section">
            <label for="name-input">Name:</label>
            <input
              id="name-input"
              v-model="inputName"
              name="name"
              maxlength="50" />
          </section>
          <section id="type-section" class="type-section section">
            <label for="type-input">Type:</label>
            <select id="type-input" name="type">
              <option value="activity" selected>Activity</option>
            </select>
          </section>
          <section id="colour-section" class="colour-section section">
            <label for="colour-variant-0">Colour:</label>
            <article
              id="colours-container"
              name="colours-container"
              class="colours-container">
              <input
                v-for="(hue, index) in hues"
                :id="'colour-variant-' + hue"
                :key="index"
                v-model="inputHue"
                class="colour-variant"
                :style="{ backgroundColor: `hsl(${hue}deg 40% 60% / 100%)` }"
                type="radio"
                name="colour"
                :value="hue"
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
                v-model="inputDateD"
                name="date-d"
                maxlength="2"
                size="2"
                min="1"
                max="31"
                placeholder="DD" />
              <p class="font-standard-large">&nbsp;/&nbsp;</p>
              <input
                id="date-m-input"
                v-model="inputDateM"
                name="date-m"
                maxlength="2"
                size="2"
                min="1"
                max="12"
                placeholder="MM" />
              <p class="font-standard-large">&nbsp;/&nbsp;</p>
              <input
                id="date-y-input"
                v-model="inputDateY"
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
                v-model="inputTimeH"
                name="time-h"
                maxlength="2"
                size="2"
                min="0"
                max="24"
                placeholder="HH" />
              <p class="font-standard-large">&nbsp;:&nbsp;</p>
              <input
                id="time-m-input"
                v-model="inputTimeM"
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
              <!--
              <input
                id="duration-d-input"
                v-model="inputDurationD"
                name="duration-d"
                maxlength="2"
                size="2"
                min="1"
                max="31"
                placeholder="DD" />
              <p class="font-standard-large">&nbsp;:&nbsp;</p>
              -->
              <input
                id="duration-h-input"
                v-model="inputDurationH"
                name="duration-h"
                maxlength="2"
                size="2"
                min="0"
                max="24"
                placeholder="HH" />
              <p class="font-standard-large">&nbsp;:&nbsp;</p>
              <input
                id="duration-m-input"
                v-model="inputDurationM"
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
            <label for="link-inputs">Links:</label>
            <article
              v-for="(link, i) in inputLinks"
              :key="i"
              class="added-link-container">
              <a
                v-if="editedLinkIndex !== i"
                class="added-link"
                :href="link.address"
                target="_blank"
                v-text="link.name"></a>
              <section v-else class="link-inputs">
                <input
                  v-model="currentLink.name"
                  class="link-name-edit-input"
                  name="link-name"
                  type="text"
                  placeholder="Name" />
                <input
                  v-model="currentLink.address"
                  class="link-address-edit-input"
                  name="link-address"
                  type="url"
                  placeholder="Address" />
              </section>
              <section class="link-buttons-container">
                <article
                  v-if="editedLinkIndex == i"
                  class="cancel-link-editing link-button"
                  @click="
                    () => {
                      editedLinkIndex = -1;
                      if (linkCreated) {
                        linkCreated = false;
                        inputLinks?.pop();
                      }
                    }
                  ">
                  <CancelIcon class="cancel-link-editing-button" />
                  <Tooltip text="Cancel" />
                </article>
                <article
                  v-if="!linkCreated || editedLinkIndex != i"
                  class="delete-link link-button"
                  @click="
                    () => {
                      editedLinkIndex = -1;
                      if (inputLinks) {
                        inputLinks.splice(i, 1);
                      }
                    }
                  ">
                  <DeleteIcon class="delete-link-button" />
                  <Tooltip text="Delete" />
                </article>
                <article
                  v-if="editedLinkIndex == i"
                  class="save-link link-button"
                  @click="
                    () => {
                      if (
                        inputLinks &&
                        currentLink.name != '' &&
                        currentLink.address != ''
                      ) {
                        inputLinks[i].name = currentLink.name;
                        inputLinks[i].address = currentLink.address;
                        editedLinkIndex = -1;
                        linkCreated = false;
                      }
                    }
                  ">
                  <SaveIcon class="save-link-button" />
                  <Tooltip text="Save" />
                </article>
                <article
                  v-if="editedLinkIndex != i"
                  class="edit-link link-button"
                  @click="
                    () => {
                      if (editedLinkIndex == -1) {
                        editedLinkIndex = i;
                        if (inputLinks) {
                          currentLink.name = inputLinks[i].name;
                          currentLink.address = inputLinks[i].address;
                        }
                      }
                    }
                  ">
                  <EditIcon class="edit-link-button" />
                  <Tooltip text="Edit" />
                </article>
              </section>
            </article>
            <article
              v-if="
                !inputLinks ||
                (inputLinks && inputLinks.length < 4 && !linkCreated)
              "
              class="add-new-link"
              @click="
                () => {
                  if (editedLinkIndex == -1) {
                    linkCreated = true;
                    currentLink = { name: '', address: '' };
                    if (inputLinks) {
                      inputLinks.push({ name: '', address: '' });
                    } else {
                      inputLinks = [{ name: '', address: '' }];
                    }
                    editedLinkIndex = inputLinks.length - 1;
                  }
                }
              ">
              <i class="plus-icon">
                <IconPlus />
              </i>
              <Tooltip text="Add new link" />
            </article>
          </section>
          <section id="description-section" class="description-section section">
            <label for="description-input">Description:</label>
            <textarea
              id="description-input"
              v-model="inputDescription"
              name="description" />
          </section>
          <section
            id="action-buttons-container"
            class="action-buttons-container">
            <article
              v-if="
                formState == DataInputEvent.EDIT ||
                formState == DataInputEvent.CREATE
              "
              id="cancel-button"
              class="cancel-button"
              @click="
                () => {
                  if (clickedActivity) {
                    store.addActivity(
                      clickedActivity.getName(),
                      clickedActivity.getType(),
                      clickedActivity.getHue(),
                      clickedActivity.getDateD(),
                      clickedActivity.getDateM(),
                      clickedActivity.getDateY(),
                      clickedActivity.getTimeH(),
                      clickedActivity.getTimeM(),
                      0,
                      clickedActivity.getDurationH(),
                      clickedActivity.getDurationM(),
                      savedLinks,
                      clickedActivity.getDescription()
                    );
                    store.deleteActivity(
                      clickedActivity.getDate(),
                      clickedActivity.getId()
                    );
                    resetInputs();
                    formState = DataInputEvent.NONE;
                  }
                }
              ">
              <p>Cancel</p>
            </article>
            <article
              v-if="formState == DataInputEvent.EDIT"
              id="delete-button"
              class="delete-button"
              @click="
                () => {
                  if (clickedActivity) {
                    store.deleteActivity(
                      clickedActivity.getDate(),
                      clickedActivity.getId()
                    );
                  }
                  resetInputs();
                  formState = DataInputEvent.NONE;
                }
              ">
              <p>Delete</p>
            </article>
            <article
              v-if="formState == DataInputEvent.CREATE"
              id="submit-button"
              :class="{
                'submit-button': true,
                'submit-error': !dataInputValid
              }"
              @click="
                () => {
                  if (dataInputValid) {
                    store.addActivity(
                      inputName as string,
                      inputType,
                      inputHue as number,
                      inputDateD as number,
                      inputDateM as number,
                      inputDateY as number,
                      inputTimeH as number,
                      inputTimeM as number,
                      0,
                      inputDurationH as number,
                      inputDurationM as number,
                      inputLinks as Link[],
                      inputDescription as string
                    );
                    resetInputs();
                    formState = DataInputEvent.NONE;
                  }
                }
              ">
              <p>Add</p>
            </article>
            <article
              v-if="formState == DataInputEvent.EDIT"
              id="save-button"
              :class="{ 'save-button': true, 'save-error': !dataInputValid }"
              @click="
                () => {
                  if (dataInputValid && clickedActivity) {
                    store.deleteActivity(
                      clickedActivity.getDate(),
                      clickedActivity.getId()
                    );
                    store.addActivity(
                      inputName as string,
                      inputType,
                      inputHue as number,
                      inputDateD as number,
                      inputDateM as number,
                      inputDateY as number,
                      inputTimeH as number,
                      inputTimeM as number,
                      0,
                      inputDurationH as number,
                      inputDurationM as number,
                      inputLinks as Link[],
                      inputDescription as string
                    );
                    resetInputs();
                    formState = DataInputEvent.NONE;
                  }
                }
              ">
              <p>Save</p>
            </article>
          </section>
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

input[type="radio"] {
  cursor: pointer;

  position: relative;

  display: inline-block;

  width: 20px;
  height: 20px;

  vertical-align: middle;

  appearance: none;
  border: none;
  border-radius: 50%;
}

input[type="radio"]:hover {
  border: 1px solid white;
}

input[type="radio"]:checked {
  border: 1px solid white;
}

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

.added-link-container {
  position: relative;

  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;

  width: 100%;
  height: 20px;
}

.added-link {
  overflow: hidden;
  max-width: 380px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.link-inputs {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;

  width: 100%;
  height: 20px;
}

.add-new-link {
  cursor: pointer;

  position: relative;

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

.link-buttons-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-left: auto;
}

.link-button {
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 16px;
  height: 16px;
}

.cancel-link-editing-button {
  stroke: var(--light-gray);
}

.delete-link-button {
  stroke: var(--intense-red);
}

.edit-link-button {
  stroke: var(--light-gray);
}

.save-link-button {
  stroke: var(--intense-green);
}

.cancel-link-editing-button,
.delete-link-button,
.edit-link-button,
.save-link-button {
  opacity: 0.6;
  transition: 200ms;
}

.cancel-link-editing-button:hover,
.delete-link-button:hover,
.edit-link-button:hover,
.save-link-button:hover {
  opacity: 1;
  transition: 200ms;
}

.data-input .tooltip {
  top: 140px;
}

.data-input-selection .tooltip {
  top: 105px;
}

.add-new-link .tooltip,
.link-button .tooltip {
  top: 30px;
}

textarea {
  resize: vertical;
  width: 100%;
  max-height: 100%;
}

.action-buttons-container {
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;

  padding: 10px;
}

.cancel-button,
.submit-button,
.save-button,
.delete-button {
  cursor: pointer;

  z-index: 1030;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 80px;
  padding: 10px;

  text-align: center;

  background: var(--element-gray);
  border-radius: 10px;

  transition: 200ms;
}

.submit-button:hover,
.cancel-button:hover,
.save-button:hover,
.delete-button:hover {
  background: var(--highlight-gray);
  transition: 200ms;

  p {
    transition: 200ms;
  }
}

.cancel-button:active,
.submit-button:active,
.save-button:active,
.delete-button:active {
  transition: 0ms;
}

.submit-button:active,
.save-button:active {
  background-color: var(--intense-green);

  p {
    color: var(--almost-white);
    transition: 0ms;
  }
}

.delete-button:active {
  background-color: var(--intense-red);

  p {
    color: var(--almost-white);
    transition: 0ms;
  }
}

.cancel-button:active {
  background-color: var(--almost-white);
}

.submit-error:active,
.save-error:active {
  background-color: var(--intense-red);
}

@media only screen and (height <= 735px) {
  .data-input-container {
    left: 13vh;
  }
}
</style>
