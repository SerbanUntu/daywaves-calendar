import { defineStore } from "pinia";
import { ref } from "vue";

export enum ActivityType {
  ACTIVITY,
  EVENT,
  FLAG
}

export type Activity = {
  name: string;
  type: ActivityType;
  hue: number;
  dateD: number;
  dateM: number;
  dateY: number;
  timeH: number;
  timeM: number;
  durationD: number;
  durationH: number;
  durationM: number;
  links: string[];
  description: string;
};

export const useActivitiesStore = defineStore("activities", () => {
  const eventsMap = ref<Map<string, Activity[]>>(new Map());
  const displayDate = ref<Date>(new Date());
  const displayWeek = ref<string>(weekName(displayDate.value));
  const currentDate = ref<Date>(new Date());

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

  function addActivity(activity: Activity) {
    const activityDate: Date = new Date(
      `${activity.dateY}-${activity.dateM}-${activity.dateD}`
    );
    const activityWeek: string = weekName(activityDate);
    const arr = eventsMap.value.get(activityWeek);
    if (arr) {
      eventsMap.value.set(activityWeek, [...arr, activity]);
    } else {
      eventsMap.value.set(activityWeek, [activity]);
    }
    console.log(eventsMap);
  }

  return {
    eventsMap,
    displayDate,
    displayWeek,
    currentDate,

    changeDisplay,
    datesArr,
    weekName,
    dayToTop,
    timeToLeft,
    timeToWidth,
    sameWeek,
    addActivity
  };
});
