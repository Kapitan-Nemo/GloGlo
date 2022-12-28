<script setup lang="ts">
import Header from "@/components/headerBar.vue";
import icon from "@/components/dynamicIcon.vue";

import { useUserStore } from "@/stores/auth";
import { useFireStore } from "@/stores/firestore";
import { useSettingsStore } from "@/stores/settings";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

const user = useUserStore();
const firestore = useFireStore();
const settings = useSettingsStore();

const avatars = import.meta.glob("@/assets/icons/avatars/*.svg");
const avatarsArray = Object.keys(avatars).map((avatar) =>
  avatar.replace("/src/assets/icons/avatars/", "").replace(".svg", "")
);

onSnapshot(doc(firestore.db, "users", user.userId), (doc) => {
  settings.$patch({ currentAvatar: doc.data()?.currentAvatar });
});

const activeAvatar = (avatar: string) => {
  settings.$patch({ currentAvatar: avatar });
  setDoc(doc(firestore.db, "users", user.userId), {
    currentAvatar: settings.currentAvatar,
  });
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
      <p class="avatars__single-active" v-if="settings.currentAvatar == avatar">
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
