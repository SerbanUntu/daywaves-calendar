import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);

app.mount("#app");

export function datesArr(date: Date) {
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

export function weekName(date: Date) {
  const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const lastMonday: Date = new Date(date);
  let change: number = lastMonday.getDay();
  if (change == 0) {
    change = 7;
  }
  lastMonday.setDate(lastMonday.getDate() - change + 1);

  const thisSunday: Date = new Date(lastMonday);
  thisSunday.setDate(thisSunday.getDate() + 6);

  if (thisSunday.getFullYear() > lastMonday.getFullYear()) {
    return `${lastMonday.getDate()} ${months[lastMonday.getMonth()].slice(0, 3)} ${lastMonday.getFullYear()} - ${thisSunday.getDate()} ${months[thisSunday.getMonth()].slice(0, 3)} ${thisSunday.getFullYear()}`;
  }
  if (thisSunday.getMonth() > lastMonday.getMonth()) {
    return `${lastMonday.getDate()} ${months[lastMonday.getMonth()].slice(0, 3)} - ${thisSunday.getDate()} ${months[thisSunday.getMonth()].slice(0, 3)} ${thisSunday.getFullYear()}`;
  }
  return `${lastMonday.getDate()} - ${thisSunday.getDate()} ${months[thisSunday.getMonth()]} ${thisSunday.getFullYear()}`;
}

export function dayToTop(day: number) {
  return 40 + day * 105;
}

export function timeToLeft(hour: number, minute: number, second: number) {
  return 109 + hour * 66.2 + minute * 66.2 / 60 + second * 66.2 / 3600;
}