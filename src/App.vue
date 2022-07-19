<template>
  <nav class="menu">
    <p class="menu__logo">GloGlo<LogoIcon></LogoIcon></p>
    <RouterLink class="menu__link" to="/"
      ><DashboardIcon></DashboardIcon>Dashboard</RouterLink
    >
    <RouterLink class="menu__link" to="/categories"
      ><CategoriesIcon></CategoriesIcon>Categories</RouterLink
    >
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import LogoIcon from "./components/icons/IconLogo.vue";
import DashboardIcon from "./components/icons/IconDashboard.vue";
import CategoriesIcon from "./components/icons/IconCategories.vue";
import "@/scss/app.scss";
</script>

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
  }
  &__logo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 30px;
    color: white;
    margin: 0 0 100px 0;
    padding: 50px 50px 0 50px;
  }
}
</style>
