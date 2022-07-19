import { useUserStore } from "@/stores/auth";
import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import LoginView from "@/views/LoginView.vue";
import CategoriesView from "@/views/CategoriesView.vue";

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
  ],
});

router.beforeEach((to) => {
  let logged = JSON.parse(localStorage.getItem("logged") || "{}");
  if (typeof logged === "object") {
    logged = false;
  }
  const auth = useUserStore();
  if (to.meta.requiresAuth && !auth.logged && !logged) {
    return {
      path: "/login",
    };
  }
});

export default router;
