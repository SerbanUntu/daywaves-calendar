import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

export function datesArr(date: Date) {
  let lastMonday: Date = new Date(date);
  lastMonday.setDate(lastMonday.getDate() - lastMonday.getDay() + 1);

  let result: number[] = Array(7);

  for (let i = 0; i < 7; i++) {
    result[i] = lastMonday.getDate();
    lastMonday.setDate(lastMonday.getDate() + 1);
  }

  return result;
}

export function weekName(date: Date) {
  let months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let lastMonday: Date = new Date(date);
  lastMonday.setDate(lastMonday.getDate() - lastMonday.getDay() + 1);

  let thisSunday: Date = new Date(lastMonday);
  thisSunday.setDate(thisSunday.getDate() + 6);

  if (thisSunday.getFullYear() > lastMonday.getFullYear()) {
    return `${lastMonday.getDate()} ${months[lastMonday.getMonth()].slice(0, 3)} ${lastMonday.getFullYear()} - ${thisSunday.getDate()} ${months[thisSunday.getMonth()].slice(0, 3)} ${thisSunday.getFullYear()}`
  }
  if (thisSunday.getMonth() > lastMonday.getMonth()) {
    return `${lastMonday.getDate()} ${months[lastMonday.getMonth()].slice(0, 3)} - ${thisSunday.getDate()} ${months[thisSunday.getMonth()].slice(0, 3)} ${thisSunday.getFullYear()}`
  }
  return `${lastMonday.getDate()} - ${thisSunday.getDate()} ${months[thisSunday.getMonth()]} ${thisSunday.getFullYear()}`
}

export function dayToTop(day: number) {
  return 40 + day * 105; 
}

export function timeToLeft(hour: number, minute: number) {
  return 109 + hour * 66 + minute * 66 / 60;
}