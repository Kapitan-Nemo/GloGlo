<template>
  <div class="categories">
    <div
      v-if="showOptions && categoryTextBefore !== ''"
      class="categories__edit"
    >
      <input class="categories__input" v-model="categoryCurrent[0].text" />
      <ColorPicker
        id="update_category"
        :visible-formats="['hex']"
        default-format="hex"
        :color="colorUpdate"
        @color-change="updateCategoryColor"
        alpha-channel="hide"
      >
        <template v-slot:copy-button>
          <span></span>
        </template>
      </ColorPicker>
      <button
        class="categories__save"
        @click="updateCategory(categoryCurrent[0].id)"
      >
        Update <SaveIcon></SaveIcon>
      </button>
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
        alpha-channel="hide"
      >
        <template v-slot:copy-button>
          <span></span>
        </template>
      </ColorPicker>
      <button class="categories__save" @click="addCategory()">
        Create <AddIcon></AddIcon>
      </button>
    </div>

    <div class="categories__collection">
      <div class="categories__collection-header">
        <h2 class="categories__collection-title">All categories</h2>
        <button
          class="categories__collection-options"
          @click="showOptions = true"
          v-if="!showOptions"
        >
          <OptionsIcon></OptionsIcon>
        </button>
        <button
          class="categories__collection-options"
          @click="showOptions = false"
          v-else
        >
          <OptionsCheckIcon></OptionsCheckIcon>
        </button>
      </div>
      <div class="categories__collection-wrapper">
        <span
          :class="{ categories__active: showOptions }"
          v-for="(category, index) in finance.categories"
          :key="index"
          :style="{ background: category.color }"
          class="categories__badge"
          >{{ category.text }}
          <div class="categories__collection-buttons" v-if="showOptions">
            <button
              class="categories__collection-button"
              @click="editCategory(category.id)"
            >
              <EditIcon></EditIcon>
            </button>
            <button
              @click="deleteCategory(category.id)"
              class="categories__collection-button"
            >
              <RemoveIcon></RemoveIcon>
            </button>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFireStore } from "@/stores/firestore";
import {
  collection,
  onSnapshot,
  query,
  updateDoc,
  doc,
  where,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { useUserStore } from "@/stores/auth";
import { ColorPicker } from "vue-accessible-color-picker";
import { useFinanceStore } from "@/stores/finance";
import OptionsIcon from "@/components/icons/IconOptions.vue";
import OptionsCheckIcon from "@/components/icons/IconOptionsCheck.vue";
import EditIcon from "@/components/icons/IconEdit.vue";
import RemoveIcon from "@/components/icons/IconRemove.vue";
import SaveIcon from "@/components/icons/IconSave.vue";
import AddIcon from "@/components/icons/IconAdd.vue";

interface Categories {
  text: string;
  color: string;
  id: string;
}
const userid = JSON.parse(localStorage.getItem("userId") || "{}");
const user = useUserStore();
const firestore = useFireStore();
const finance = useFinanceStore();
const colorNew = ref("#000000");
const colorUpdate = ref("");
const categoryCurrent = ref<Array<Categories>>([
  { id: "", text: "", color: "" },
]);
const newCategory = ref<Array<Categories>>([{ id: "", text: "", color: "" }]);
const categoryTextBefore = ref("");
const categoryColorBefore = ref("");
const showOptions = ref(false);
const categoriesCollectionRef = collection(
  firestore.db,
  "users",
  userid,
  "categories"
);
function newCategoryColor(eventData: { cssColor: string }) {
  colorNew.value = eventData.cssColor;
}
function updateCategoryColor(eventData: { cssColor: string }) {
  categoryCurrent.value[0].color = eventData.cssColor;
}
const categoriesCollectionQuery = query(categoriesCollectionRef);
onMounted(() => {
  onSnapshot(categoriesCollectionQuery, (querySnapshot) => {
    const newCategories: {
      id: string;
      text: string;
      color: string;
    }[] = [];
    querySnapshot.forEach((doc) => {
      const category = {
        id: doc.id,
        text: doc.data().text,
        color: doc.data().color,
      };
      newCategories.push(category);
    });
    finance.categories = newCategories;
  });
});

const editCategory = (id: string) => {
  const index = finance.categories.findIndex((category) => category.id === id);
  categoryCurrent.value[0] = finance.categories[index];
  colorUpdate.value = finance.categories[index].color;
  categoryTextBefore.value = finance.categories[index].text;
  categoryColorBefore.value = finance.categories[index].color;
};
const updateCategory = async (id: string) => {
  const index = finance.categories.findIndex((category) => category.id === id);
  if (finance.categories[index].text == "") {
    alert("Name can't be empty!");
  } else {
    const updateDocCategory = doc(
      firestore.db,
      "users",
      user.userId,
      "categories",
      id
    );
    updateDoc(updateDocCategory, {
      text: finance.categories[index].text,
      color: finance.categories[index].color,
    });

    const searchCategory = query(
      collection(firestore.db, "users", user.userId, "records"),
      where("category.text", "==", categoryTextBefore.value) ||
        where("category.color", "==", categoryColorBefore.value)
    );

    const queryCategory = await getDocs(searchCategory);
    queryCategory.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        "category.text": finance.categories[index].text,
        "category.color": finance.categories[index].color,
      });
    });
    alert("Category update sucess");
  }
};

const deleteCategory = (id: string) => {
  finance.categories.filter((category) => category.id !== id);
  deleteDoc(doc(firestore.db, "users", user.userId, "categories", id));
};

const addCategory = () => {
  if (newCategory.value[0].text == "" || colorNew.value == "") {
    alert("Name can't be empty!");
  } else {
    addDoc(collection(firestore.db, "users", user.userId, "categories"), {
      text: newCategory.value[0].text,
      color: colorNew.value,
    });
    newCategory.value[0].text = "";
  }
};
</script>

<style lang="scss">
.categories {
  display: flex;
  .vacp-color-picker {
    background: $bg-secondary;
    max-width: 330px;
  }
  .vacp-color-input {
    background-color: $bg-secondary;
    border: none;
  }
  &__edit {
    width: 380px;
    min-height: 262px;
    background-color: #1e1f25;
    padding: 25px;
    border-radius: 10px;
    margin: 0 30px 0 0;
    justify-content: space-between;
    display: flex;
    flex-flow: column;
  }
  &__input {
    border-bottom: solid 1px #00dee2;
    border-left: none;
    border-top: none;
    border-right: none;
    background: transparent;
    color: #fff;
    font-size: 20px;
    max-width: 150px;
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

  &__collection {
    width: 380px;
    min-height: 262px;
    background-color: $bg-secondary;
    padding: 25px;
    border-radius: 10px;
    &-header {
      margin: 0 0 25px 0;
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
  &__badge {
    border-radius: 20px;
    font-size: 20px;
    color: $white;
    margin: 0 0 30px 0;
    width: 140px;
    height: 40px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
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
