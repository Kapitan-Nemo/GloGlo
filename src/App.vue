<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";
import { useFinanceStore } from "@/stores/finance";
import { useFireStore } from "@/stores/firestore";

import type { ICategories, IRecords } from "@/utils/interface";
import { storeToRefs } from "pinia";

import Logo from "@/assets/icons/logo/logo.svg?component";
import Home from "@/assets/icons/other/home.svg?component";
import Categories from "@/assets/icons/other/categories.svg?component";
import Settings from "@/assets/icons/other/settings.svg?component";

import "@/scss/app.scss";
import { onMounted } from "vue";
import { onSnapshot } from "@firebase/firestore";

const firestore = useFireStore();
const finance = useFinanceStore();
const { records, categories } = storeToRefs(firestore);

const fetchRecords = async () => {
  //Fetch records from firestore and add them to the store
  const newRecords = ref<IRecords[]>([]);
  (await records.value).forEach(async (doc) => {
    const record = {
      id: doc.id,
      cost: doc.data().cost,
      category: doc.data().category,
      editMode: doc.data().editMode,
      month: doc.data().month,
      year: doc.data().year,
    };
    newRecords.value.push(record);
  });
  finance.records = newRecords.value;
};

const fetchCategories = async () => {
  //Fetch categories from firestore and add them to the store
  onSnapshot(categories.value, (querySnapshot) => {
    const newCategories = ref<ICategories[]>([]);
    querySnapshot.forEach((doc) => {
      const category = {
        id: doc.id,
        text: doc.data().text,
        color: doc.data().color,
        date: doc.data().date,
      };
      newCategories.value.push(category);
    });
    finance.categories = newCategories.value;
  });
};

onMounted(() => {
  fetchRecords();
  fetchCategories();
  console.log("Odpalam records", finance.records);
  console.log("Odpalam categories", finance.categories);
});
</script>

<template>
  <nav class="menu">
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
