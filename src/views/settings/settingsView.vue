<script setup lang="ts">
import Header from "@/components/headerBar.vue";
//TODO: refactor
// const avatars = import.meta.glob("@/assets/icons/avatars/*.svg");
// const avatarsArray = Object.keys(avatars).map((avatar) =>
//   avatar.replace("@/assets/icons/avatars/", "")
// );
// const currentAvatar = ref("/assets/icons/avatars/avatar-1.svg"); //TODO: get from api call
// const activeAvatar = (avatar: string) => {
//   currentAvatar.value = avatar;
// };
import Avatar from "@/assets/icons/avatars/avatar-1.svg?component";
</script>

<template>
  <Header msg="Select your fighter"></Header>
  <div class="avatars">
    <div class="avatars__single">
      <avatar class="avatars__single-photo" />
      <p class="avatars__single-active">Active</p>
    </div>
    <!-- //TODO: refactor -->
    <!--  <div
      class="avatars__single"
      @click="activeAvatar(avatar)"
      v-for="avatar in avatarsArray"
      :key="avatar"
    >
      <img class="avatars__single-photo" :src="`${avatar}`" />
      <p class="avatars__single-active" v-if="currentAvatar == avatar">
        Active
      </p>
    </div> -->
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
