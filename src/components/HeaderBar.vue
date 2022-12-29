<script setup lang="ts">
import { useUserStore } from "@/stores/auth";
import { getAuth, signOut } from "firebase/auth";
import { ref, watch } from "vue";
import { useSettingsStore } from "@/stores/settings";
import router from "@/router";

import icon from "@/components/dynamicIcon.vue";
import CalendarIcon from "@/assets/icons/other/calendar.svg?component";
import LogoutIcon from "@/assets/icons/actions/logout.svg?component";
import NotifyIcon from "@/assets/icons/actions/notification.svg?component";
import UserIcon from "@/assets/icons/other/settings-color.svg?component";
import { storeToRefs } from "pinia";

const user = useUserStore();
const auth = getAuth();
const showAccount = ref(false);
const settings = useSettingsStore();
const { currentAvatar } = storeToRefs(settings);
const componentKey = ref(0);

watch(
  () => currentAvatar.value,
  () => {
    componentKey.value += 1;
  }
);

defineProps<{
  msg: string;
}>();

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

<template>
  <header class="header">
    <div class="header__wrap">
      <h1>Hi, {{ user.userName }}!</h1>
      <div class="header__buttons">
        <CalendarIcon class="header__buttons-calendar"></CalendarIcon>
        <NotifyIcon class="header__buttons-notify"></NotifyIcon>
        <Transition name="fade" mode="out-in">
          <icon
            :key="componentKey"
            @click="showAccount = !showAccount"
            class="header__buttons-avatar"
            path="avatars"
            :name="currentAvatar"
          />
        </Transition>
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

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.header {
  margin: 0 0 50px 0;
  &__subtitle {
    margin: 0;
  }
  &__wrap {
    display: flex;
    justify-content: space-between;
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
    &-calendar {
      margin: 0 30px 0 0;
      // display: flex;
    }
    &-notify {
      margin: 0 30px 0 0;
      // display: flex;
    }
    &-avatar {
      // display: flex;
      cursor: pointer;
      width: 50px;
      height: 50px;
    }
  }
}
</style>
