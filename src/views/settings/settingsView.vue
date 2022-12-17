<script setup lang="ts">
import { ref } from "vue";
const avatars = import.meta.glob("@/assets/icons/avatars/*.svg");
const avatarsArray = Object.keys(avatars).map((font) =>
  font.replace("@/assets/icons/avatars/", "")
);
const currentAvatar = ref("/src/assets/icons/avatars/avatar-1.svg"); //TODO: get from api call

const activeAvatar = (avatar: string) => {
  currentAvatar.value = avatar;
};
</script>

<template>
  <h1 class="">Select your fighter</h1>
  <div class="avatars">
    <div
      class="avatars__single"
      @click="activeAvatar(item)"
      v-for="item in avatarsArray"
      :key="item"
    >
      <img class="avatars__single-photo" :src="`${item}`" />
      <p class="avatars__single-active" v-if="currentAvatar == item">Active</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
