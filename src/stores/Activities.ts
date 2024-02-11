import { defineStore } from "pinia";
import { ref } from "vue";

export enum ActivityType {
  ACTIVITY,
  EVENT,
  FLAG
}

export enum DataInputEvent {
  NONE,
  EDIT,
  CREATE
}

export interface Link {
  name: string;
  address: string;
}

class Activity {
  private hashId: string;
  private name: string;
  private type: ActivityType;
  private hue: number;
  private dateStartD: number;
  private dateStartM: number;
  private dateStartY: number;
  private dateEndD: number;
  private dateEndM: number;
  private dateEndY: number;
  private timeStartH: number;
  private timeStartM: number;
  private timeEndH: number;
  private timeEndM: number;
  private links: Link[];
  private description: string;

  constructor(
    hashId: string,
    name: string,
    type: ActivityType,
    hue: number,
    dateD: number,
    dateM: number,
    dateY: number,
    timeStartH: number,
    timeStartM: number,
    timeEndH: number,
    timeEndM: number,
    links: Link[],
    description: string
  ) {
    this.hashId = hashId;
    this.name = name;
    this.type = type;
    this.hue = hue;
    this.dateStartD = dateD;
    this.dateStartM = dateM;
    this.dateStartY = dateY;
    this.dateEndD = dateD;
    this.dateEndM = dateM;
    this.dateEndY = dateY;
    this.timeStartH = timeStartH;
    this.timeStartM = timeStartM;
    this.timeEndH = timeEndH;
    this.timeEndM = timeEndM;
    this.links = links;
    this.description = description;
  }

  getDateObject() {
    return new Date(`${this.dateStartY}-${this.dateStartM}-${this.dateStartD}`);
  }

  getId() {
    return this.hashId;
  }

  getName() {
    return this.name;
  }

  getType() {
    return this.type;
  }

  getHue() {
    return this.hue;
  }

  getDateStartD() {
    return this.dateStartD;
  }

  getDateStartM() {
    return this.dateStartM;
  }

  getDateStartY() {
    return this.dateStartY;
  }

  getDateEndD() {
    return this.dateEndD;
  }

  getDateEndM() {
    return this.dateEndM;
  }

  getDateEndY() {
    return this.dateEndY;
  }

  getTimeStartH() {
    return this.timeStartH;
  }

  getTimeStartM() {
    return this.timeStartM;
  }

  getTimeEndH() {
    return this.timeEndH;
  }

  getTimeEndM() {
    return this.timeEndM;
  }

  getLinks() {
    return this.links;
  }

  getDescription() {
    return this.description;
  }

  getDateStart() {
    return `${this.dateStartY}-${this.dateStartM}-${this.dateStartD}`;
  }

  getDateEnd() {
    return `${this.dateEndY}-${this.dateEndM}-${this.dateEndD}`;
  }

  getTimeStart() {
    return `${this.timeStartH}:${this.timeStartM}:00`;
  }

  getTimeEnd() {
    return `${this.timeEndH}:${this.timeEndM}:00`;
  }
}

export const useActivitiesStore = defineStore("activities", () => {
  /*
  const localStorageData = localStorage.getItem("daywavesData");
  const initialValue = localStorageData
    ? JSON.parse(localStorageData)
    : new Map();
  */

  const eventsMap = ref<Map<string, Map<string, Activity>>>(new Map());
  const displayDate = ref<Date>(new Date());
  const displayWeek = ref<string>(weekName(displayDate.value));
  const currentDate = ref<Date>(new Date());
  const formState = ref<DataInputEvent>(DataInputEvent.NONE);
  const clickedActivity = ref<Activity>();
  const openWeekSelectorMenu = ref<boolean>(false);

  setInterval(() => (currentDate.value = new Date()), 1);

  function changeDisplay(change: number): void {
    displayDate.value.setDate(displayDate.value.getDate() + 7 * change);
    displayWeek.value = weekName(displayDate.value);
  }

  function datesArr(date: Date) {
    const lastMonday: Date = new Date(date);
    let change: number = lastMonday.getDay();
    if (change == 0) {
      change = 7;
    }
    lastMonday.setDate(lastMonday.getDate() - change + 1);

    const result: number[] = Array(7);

    for (let i = 0; i < 7; i++) {
      result[i] = lastMonday.getDate();
      lastMonday.setDate(lastMonday.getDate() + 1);
    }

    return result;
  }

  function weekName(date: Date): string {
    const months: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const lastMonday: Date = new Date(date);
    let change: number = lastMonday.getDay();
    if (change == 0) {
      change = 7;
    }
    lastMonday.setDate(lastMonday.getDate() - change + 1);

    const thisSunday: Date = new Date(lastMonday);
    thisSunday.setDate(thisSunday.getDate() + 6);

    if (thisSunday.getFullYear() > lastMonday.getFullYear()) {
      return `${lastMonday.getDate()} ${months[lastMonday.getMonth()].slice(
        0,
        3
      )} ${lastMonday.getFullYear()} - ${thisSunday.getDate()} ${months[
        thisSunday.getMonth()
      ].slice(0, 3)} ${thisSunday.getFullYear()}`;
    }
    if (thisSunday.getMonth() > lastMonday.getMonth()) {
      return `${lastMonday.getDate()} ${months[lastMonday.getMonth()].slice(
        0,
        3
      )} - ${thisSunday.getDate()} ${months[thisSunday.getMonth()].slice(
        0,
        3
      )} ${thisSunday.getFullYear()}`;
    }
    return `${lastMonday.getDate()} - ${thisSunday.getDate()} ${
      months[thisSunday.getMonth()]
    } ${thisSunday.getFullYear()}`;
  }

  function dayToTop(day: number) {
    return 40 + day * 105;
  }

  function timeToLeft(hour: number, minute: number, second: number) {
    return 109 + hour * 66.2 + (minute * 66.2) / 60 + (second * 66.2) / 3600;
  }

  function timeToWidth(hour: number, minute: number) {
    return hour * 66.2 + (minute * 66.2) / 60;
  }

  function sameWeek(date1: Date, date2: Date) {
    const adjustedDay1 = date1.getDay() == 0 ? 7 : date1.getDay();
    const adjustedDay2 = date2.getDay() == 0 ? 7 : date2.getDay();
    if (
      adjustedDay1 - adjustedDay2 !=
        Math.round((date1.getTime() - date2.getTime()) / 1000 / 60 / 60 / 24) +
          1 &&
      adjustedDay1 - adjustedDay2 !=
        Math.round((date1.getTime() - date2.getTime()) / 1000 / 60 / 60 / 24)
    ) {
      return false;
    }
    return true;
  }

  function addActivity(
    name: string,
    type: ActivityType,
    hue: number,
    dateD: number,
    dateM: number,
    dateY: number,
    timeStartH: number,
    timeStartM: number,
    timeEndH: number,
    timeEndM: number,
    links: Link[],
    description: string
  ) {
    const newActivity = new Activity(
      makeId(16),
      name,
      type,
      hue,
      dateD,
      dateM,
      dateY,
      timeStartH,
      timeStartM,
      timeEndH,
      timeEndM,
      links,
      description
    );
    const activityWeek: string = weekName(newActivity.getDateObject());
    const weekMap = eventsMap.value.get(activityWeek);
    if (weekMap) {
      weekMap.set(newActivity.getId(), newActivity);
    } else {
      const newMap = new Map();
      newMap.set(newActivity.getId(), newActivity);
      eventsMap.value.set(activityWeek, newMap);
    }
  }

  function makeId(length: number): string {
    let result: string = "";
    const characters: string =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function setClickedActivity(hashId: string, week: string) {
    const weekMap = eventsMap.value.get(week);
    if (weekMap) {
      const activityRef = weekMap.get(hashId);
      if (activityRef) {
        clickedActivity.value = new Activity(
          activityRef.getId(),
          activityRef.getName(),
          activityRef.getType(),
          activityRef.getHue(),
          activityRef.getDateStartD(),
          activityRef.getDateStartM(),
          activityRef.getDateStartY(),
          activityRef.getTimeStartH(),
          activityRef.getTimeStartM(),
          activityRef.getTimeEndH(),
          activityRef.getTimeEndM(),
          activityRef.getLinks(),
          activityRef.getDescription()
        );
      }
    }
  }

  function deleteActivity(date: Date, id: string): void {
    const activityWeek: string = weekName(date);
    const weekMap = eventsMap.value.get(activityWeek);
    weekMap?.delete(id);
  }

  function getActivityRef(date: Date, id: string) {
    const activityWeek: string = weekName(date);
    const weekMap = eventsMap.value.get(activityWeek);
    const result = weekMap?.get(id);
    if (result) {
      return result;
    } else {
      return new Activity(
        "",
        "",
        ActivityType.ACTIVITY,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        [],
        ""
      );
    }
  }

  function editActivity(
    date: Date,
    id: string,
    name: string,
    type: ActivityType,
    hue: number,
    dateD: number,
    dateM: number,
    dateY: number,
    timeStartH: number,
    timeStartM: number,
    timeEndH: number,
    timeEndM: number,
    links: Link[],
    description: string
  ) {
    const newActivity = new Activity(
      id,
      name,
      type,
      hue,
      dateD,
      dateM,
      dateY,
      timeStartH,
      timeStartM,
      timeEndH,
      timeEndM,
      links,
      description
    );
    deleteActivity(date, id);
    const activityWeek: string = weekName(newActivity.getDateObject());
    const weekMap = eventsMap.value.get(activityWeek);
    if (weekMap) {
      weekMap.set(newActivity.getId(), newActivity);
    } else {
      const newMap = new Map();
      newMap.set(newActivity.getId(), newActivity);
      eventsMap.value.set(activityWeek, newMap);
    }
  }

  return {
    eventsMap,
    displayDate,
    displayWeek,
    currentDate,
    formState,
    clickedActivity,
    openWeekSelectorMenu,

    changeDisplay,
    datesArr,
    weekName,
    dayToTop,
    timeToLeft,
    timeToWidth,
    sameWeek,
    addActivity,
    setClickedActivity,
    deleteActivity,
    getActivityRef,
    editActivity
  };
});
