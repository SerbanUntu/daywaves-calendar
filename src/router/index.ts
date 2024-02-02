import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DailyNoteView from "../views/DailyNoteView.vue";
import TemplatesView from "../views/TemplatesView.vue";
import RoutinesView from "../views/RoutinesView.vue";
import PinsView from "../views/PinsView.vue";
import BirthdaysView from "../views/BirthdaysView.vue";
import AccountView from "../views/AccountView.vue";
import SettingsView from "../views/SettingsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/daily-note",
      name: "daily-note",
      component: DailyNoteView
    },
    {
      path: "/templates",
      name: "templates",
      component: TemplatesView
    },
    {
      path: "/routines",
      name: "routines",
      component: RoutinesView
    },
    {
      path: "/pins",
      name: "pins",
      component: PinsView
    },
    {
      path: "/birthdays",
      name: "birthdays",
      component: BirthdaysView
    },
    {
      path: "/account",
      name: "account",
      component: AccountView
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsView
    }
  ]
});

export default router;
