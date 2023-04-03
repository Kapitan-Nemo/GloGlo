<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "@/stores/auth";
import { onMounted } from "vue";
import router from "@/router";
import "@/scss/app.scss";
import icon from "@/components/dynamicIcon.vue";

const auth = useUserStore();

onMounted(() => {
  auth.onAuthStateChanged();
  router.beforeEach((to) => {
    if (to.meta.requiresAuth && !auth.logged) {
      return {
        path: "/login",
      };
    }
  });
});
</script>

<template>
  <nav v-show="auth.logged" class="menu">
    <div class="menu__logo">
      <icon name="logo" path="logo" />
    </div>

    <RouterLink class="menu__link" to="/"
      ><icon name="home" path="other" />Dashboard</RouterLink
    >
    <RouterLink class="menu__link" to="/categories"
      ><icon name="categories" path="other" />Categories</RouterLink
    >
    <RouterLink class="menu__link" to="/settings"
      ><icon name="settings" path="other" />Settings</RouterLink
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
