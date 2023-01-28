<script setup lang="ts">
import { ref } from "vue";
import { useFireStore } from "@/stores/firestore";
import {
  collection,
  query,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { useUserStore } from "@/stores/auth";
import { ColorPicker } from "vue-accessible-color-picker";
import { useFinanceStore } from "@/stores/finance";
import Add from "@/assets/icons/actions/add.svg?component";
import Edit from "@/assets/icons/actions/edit.svg?component";
import Delete from "@/assets/icons/actions/delete.svg?component";
import Save from "@/assets/icons/actions/save.svg?component";
import type { ICategories } from "@/utils/interface";

const firestore = useFireStore();
const user = useUserStore();
const finance = useFinanceStore();

const colorNew = ref("#000000");

const newCategory = ref<Array<ICategories>>([
  { id: "", text: "", color: "", date: Date.now() },
]);

const showOptions = ref(false);
const currentIndex = ref();
const currentEdited = {
  text: "",
  color: "",
};
const kurwidlo = ref({
  id: "",
  text: "",
  color: "",
  date: Date.now(),
});

console.log("categories:", finance.categories);

function newCategoryColor(eventData: { cssColor: string }) {
  colorNew.value = eventData.cssColor;
}
function updateCategoryColor(eventData: { cssColor: string }) {
  kurwidlo.value.color = eventData.cssColor;
}

const editCategory = (index: number, category: ICategories) => {
  showOptions.value = !showOptions.value;
  currentIndex.value = index;
  kurwidlo.value = category;

  currentEdited.color = category.color;
  currentEdited.text = category.text;
};

const updateCategory = async (id: string) => {
  // Update current category
  finance.categories = [];
  await updateDoc(doc(firestore.db, "users", user.userId, "categories", id), {
    text: kurwidlo.value.text,
    color: kurwidlo.value.color,
  });

  // Search category in existed records and update
  (
    await getDocs(
      query(
        collection(firestore.db, "users", user.userId, "records"),
        where("category.text", "==", currentEdited.text) ||
          where("category.color", "==", currentEdited.color)
      )
    )
  ).forEach(async (doc) => {
    await updateDoc(doc.ref, {
      "category.text": kurwidlo.value.text,
      "category.color": kurwidlo.value.color,
    });
  });

  showOptions.value = false;
  currentIndex.value = undefined;
};

const deleteCategory = (id: string) => {
  finance.categories.filter((category) => category.id !== id);
  deleteDoc(doc(firestore.db, "users", user.userId, "categories", id));
  finance.categories = [];
  showOptions.value = false;
  currentIndex.value = undefined;
};

const addCategory = () => {
  console.log("save record");
  addDoc(collection(firestore.db, "users", user.userId, "categories"), {
    text: newCategory.value[0].text,
    color: colorNew.value,
    date: Date.now(),
  });
  finance.categories = [];

  newCategory.value[0].text = "";
};
</script>

<template>
  <div class="categories">
    <div
      class="categories__collection"
      :class="{
        categories__collection__active: showOptions,
      }"
    >
      <div class="categories__collection-header">
        <h2 class="categories__collection-title">All categories</h2>
      </div>
      <div v-if="finance.categories[0] == null" class="categories__empty">
        <p class="finance__empty-text">Whoops… There is no categories!</p>
      </div>
      <div
        v-for="(category, index) in finance.categories"
        :key="index"
        class="categories__row"
        :class="{
          categories__row__active: index === currentIndex,
        }"
      >
        <span
          :style="{ background: category.color }"
          class="categories__row-badge"
          >{{ category.text }}</span
        >
        <div class="categories__row-actions">
          <button
            :class="{
              categories__hide: index === currentIndex,
            }"
            class="categories__row-button"
            @click="editCategory(index, category)"
          >
            <Edit></Edit>
          </button>
          <button
            v-if="index == currentIndex && showOptions"
            class="categories__row-button"
            @click="updateCategory(category.id)"
          >
            <Save></Save>
          </button>
          <button
            class="categories__row-button"
            @click="deleteCategory(category.id)"
          >
            <Delete></Delete>
          </button>
        </div>
      </div>
    </div>
    <div v-if="showOptions" class="categories__edit">
      <input class="categories__input" v-model="kurwidlo.text" />
      <ColorPicker
        id="update_category"
        :visible-formats="['hex']"
        default-format="hex"
        :color="kurwidlo.color"
        @color-change="updateCategoryColor"
      >
        <template v-slot:copy-button>
          <span></span>
        </template>
      </ColorPicker>
    </div>
    <div v-else class="categories__edit">
      <input
        placeholder="Category name"
        class="categories__input"
        v-model="newCategory[0].text"
      />
      <ColorPicker
        id="new_category"
        :visible-formats="['hex']"
        default-format="hex"
        :color="colorNew"
        @color-change="newCategoryColor"
      >
        <template v-slot:copy-button>
          <span></span>
        </template>
      </ColorPicker>
      <button class="categories__save" @click="addCategory()">
        Add new <Add></Add>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.categories {
  display: flex;
  .vacp-color-picker {
    background: $bg-secondary;
    max-width: 330px;
    padding: 0px;
  }
  .vacp-color-input {
    background-color: $bg-secondary;
    border: solid 1px;
    border-radius: 10px;
    font-size: 20px;
  }
  .vacp-copy-button {
    display: none;
  }

  &__empty {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    svg {
      width: 100px;
    }
  }

  &__edit {
    width: 380px;
    max-height: 530px;
    background-color: $bg-secondary;
    padding: 25px;
    border-radius: 10px;
    margin: 0 30px 0 0;
    justify-content: space-between;
    display: flex;
    flex-flow: column;
  }
  &__input {
    border-bottom: solid 1px $primary;
    border-left: none;
    border-top: none;
    border-right: none;
    background: transparent;
    color: $white;
    font-size: 25px;
    max-width: 200px;
    padding: 0 0 5px 0;
    margin: 0 0 30px 0;
  }
  &__save {
    width: 200px;
    height: 45px;
    padding: 0 15px 0 15px;
    border: solid 1px $gray;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $white;
    background-color: transparent;
    border-radius: 10px;
    font-size: 20px;
    margin: 30px auto 0 auto;
    cursor: pointer;
    svg {
      width: 25px;
    }
  }

  &__row {
    border-top: solid 1px $gray;
    border-bottom: solid 1px $gray;
    border-left: none;
    border-right: none;
    margin: 0 0 25px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $white;
    &__active {
      opacity: 1 !important;
      pointer-events: all !important;
    }
    &-badge {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      border-radius: 15px;
      text-align: center;
      padding: 5px 10px 5px 10px;
      margin: 0 auto;
      font-size: 20px;
      color: $white;
      width: 140px;
    }
    &-actions {
      display: flex;
    }
    &-button {
      background: transparent;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      display: flex;
      border-left: solid 1px #292d39;
      padding: 25px;
    }
  }

  &__hide {
    display: none;
  }

  &__collection {
    overflow: auto;
    &::-webkit-scrollbar {
      display: none; /* Chrome and Safari */
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    width: 380px;
    height: 62vh;
    background-color: $bg-secondary;
    border-radius: 10px;
    margin: 0 30px 0 0;
    &__active {
      .categories__row {
        opacity: 0.5;
        pointer-events: none;
      }
    }
    &-header {
      padding: 25px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &-options {
      border: none;
      background: transparent;
      width: 35px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    &-title {
      color: $white;
      margin: 0;
      font-size: 25px;
    }
    &-wrapper {
      display: flex;
      align-items: center;
      flex-flow: wrap;
      justify-content: space-between;
    }
    &-buttons {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      border-radius: 20px;
      opacity: 0.7;
      height: 100%;
      background: black;
    }
    &-button {
      background: transparent;
      border: none;
      cursor: pointer;
      height: 100%;
      width: 100%;
    }
  }

  &__active {
    font-size: 0;
    padding: 0;
    svg {
      height: 25px;
    }
  }
}
</style>
