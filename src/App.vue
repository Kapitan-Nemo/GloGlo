<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
// import { useFinanceStore } from "@/stores/finance";
import { useUserStore } from "@/stores/auth";
import { onMounted } from "vue";

import Logo from "@/assets/icons/logo/logo.svg?component";
import Home from "@/assets/icons/other/home.svg?component";
import Categories from "@/assets/icons/other/categories.svg?component";
import Settings from "@/assets/icons/other/settings.svg?component";
import "@/scss/app.scss";
import router from "./router";

const auth = useUserStore();

//TODO:HANDLE 404 PAGE

onMounted(() => {
  console.log("app view...");
  auth.onAuthStateChanged();
  router.beforeEach((to) => {
    if (to.meta.requiresAuth && !auth.logged) {
      return {
        path: "/login",
      };
    }
  });
  console.log(auth.logged);
});
</script>

<template>
  <nav v-show="auth.logged" class="menu">
    <div class="menu__logo">
      <Logo />
    </div>

    <RouterLink class="menu__link" to="/"><Home />Dashboard</RouterLink>
    <RouterLink class="menu__link" to="/categories"
      ><Categories />Categories</RouterLink
    >
    <RouterLink class="menu__link" to="/settings"
      ><Settings />Settings</RouterLink
    >
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss">
main {
  width: 100%;
  padding: 50px;
  header {
    h1 {
      margin: 0;
    }
  }
}
#app {
  display: flex;
  height: 100vh;
  background-color: $bg-primary;
  overflow: hidden;
  position: relative;
}
.menu {
  min-width: 300px;
  display: flex;
  flex-flow: column;
  background: $bg-secondary;
  svg {
    fill: $secondary;
  }
  &__link {
    font-size: 20px;
    color: $secondary;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 50px 0;
    padding: 0 50px 0px 50px;
  }
  &__active {
    color: $primary;
    border-right: solid 2px;
    svg {
      fill: $primary;
    }
  }
  &__logo {
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
    font-size: 30px;
    margin: 0 0 50px 0;
    padding: 65px 50px 0 50px;
  }
}
</style>
