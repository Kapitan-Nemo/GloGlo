import { createRouter, createWebHistory } from "vue-router";

const DashboardView = () => import("@/views/dashboard/dashboardView.vue");
const LoginView = () => import("@/views/login/loginView.vue");
const CategoriesView = () => import("@/views/categories/categoriesView.vue");
const SettingsView = () => import("@/views/settings/settingsView.vue");
const NotFound = () => import("@/views/notFound/notFoundView.vue");

console.log("odpalam index router");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "menu__active",
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },

    {
      path: "/categories",
      name: "categories",
      component: CategoriesView,
      meta: { requiresAuth: true },
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsView,
      meta: { requiresAuth: true },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
      meta: { requiresAuth: true },
    },
  ],
});

export default router;
