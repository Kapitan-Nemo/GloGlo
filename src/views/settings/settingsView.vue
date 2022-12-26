<script setup lang="ts">
import Header from "@/components/headerBar.vue";
import icon from "@/components/dynamicIcon.vue";
import { ref } from "vue";

const avatars = import.meta.glob("@/assets/icons/avatars/*.svg");
const avatarsArray = Object.keys(avatars).map((avatar) =>
  avatar.replace("/src/assets/icons/avatars/", "").replace(".svg", "")
);

const currentAvatar = ref("avatar-1"); //TODO: get from api call
const activeAvatar = (avatar: string) => {
  currentAvatar.value = avatar;
};
</script>

<template>
  <Header msg="Select your fighter"></Header>
  <div class="avatars">
    <div
      class="avatars__single"
      @click="activeAvatar(avatar)"
      v-for="avatar in avatarsArray"
      :key="avatar"
    >
      <icon class="avatars__single-photo" path="avatars" :name="avatar" />
      <p class="avatars__single-active" v-if="currentAvatar == avatar">
        Active
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  margin: 0 0 0 0;
}
.subtitle {
  margin: 0 0 30px 0;
}
.avatars {
  display: flex;
  &__single {
    padding: 0 30px 0px 0;
    flex-flow: column;
    display: flex;
    align-items: center;
    justify-content: c;
    &-photo {
      transition: transform 250ms;
      cursor: pointer;
      &:hover {
        transform: translateY(-10px);
      }
    }
    &-active {
      color: $primary;
    }
  }
}
</style>
