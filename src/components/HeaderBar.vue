<template>
  <header class="header">
    <div class="header__wrap">
      <h1>Hi, {{ user.userName }}!</h1>
      <div class="header__buttons">
        <CalendarIcon class="header__buttons-calendar"></CalendarIcon>
        <NotifyIcon class="header__buttons-notify"></NotifyIcon>
        <AvatarIcon
          @click="showAccount = !showAccount"
          class="header__buttons-avatar"
        ></AvatarIcon>
      </div>
    </div>
    <p class="header__subtitle">{{ msg }}</p>
    <Transition>
      <div v-if="showAccount" class="header__account">
        <p class="header__account-action">
          <UserIcon class="header__account-action-icon"></UserIcon>Settings
        </p>
        <p class="header__account-action" @click="singOutGoogle">
          <LogoutIcon class="header__account-action-icon"></LogoutIcon>Logout
        </p>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/auth";
import { getAuth, signOut } from "firebase/auth";
import router from "@/router";
import CalendarIcon from "./icons/IconCalendar.vue";
import NotifyIcon from "./icons/IconNotify.vue";
import UserIcon from "./icons/IconUser.vue";
import LogoutIcon from "./icons/IconLogout.vue";
import AvatarIcon from "@/assets/icons/avatars/avatar-1.svg?component";
import { ref } from "vue";

defineProps<{
  msg: string;
}>();
const user = useUserStore();
const auth = getAuth();
const showAccount = ref(false);
function singOutGoogle() {
  signOut(auth)
    .then(() => {
      router.push("/login");
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<style lang="scss">
.header {
  position: relative;
  margin: 0 0 50px 0;
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  &__subtitle {
    margin: 0;
  }
  &__wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__account {
    width: 210px;
    height: 150px;
    position: absolute;
    right: 0;
    bottom: -170px;
    background: $bg-secondary;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-flow: column;
    &-action {
      transition: all 0.6s ease;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      color: $white;
      cursor: pointer;
      margin: 0;
      padding: 20px;
      &:hover {
        transition: all 0.6s ease;
        color: $primary;
      }
      &:first-child {
        border-bottom: solid 6px $bg-primary;
      }
      &-icon {
        color: $primary;
      }
    }
  }
  &__buttons {
    display: flex;
    align-items: center;
    &-calendar {
      margin: 0 30px 0 0;
    }
    &-notify {
      margin: 0 50px 0 0;
    }
    &-avatar {
      cursor: pointer;
      width: 51px;
      height: 68px;
    }
  }
}
</style>
