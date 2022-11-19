<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/auth";
import { useFireStore } from "@/stores/firestore";
import { useFinanceStore } from "@/stores/finance";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { financeChart } from "@/composables/financechart.js";
import { storeToRefs } from "pinia";
import Add from "@/assets/icons/actions/add.svg?component";
import Edit from "@/assets/icons/actions/edit.svg?component";
import Delete from "@/assets/icons/actions/delete.svg?component";
import Save from "@/assets/icons/actions/save.svg?component";

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import type { IRecords } from "@/utils/interface";

const userid = JSON.parse(localStorage.getItem("userId") || "{}");
const user = useUserStore();
const firestore = useFireStore();
const finance = useFinanceStore();
const { dateSelected, records } = storeToRefs(firestore);

const newRecordCost = ref(0);
const newRecordCategory = ref({
  color: "",
  text: "",
  id: "",
});

// const categoriesCollectionQuery = query(
//   collection(firestore.db, "users", userid, "categories"),
//   orderBy("date", "desc")
// );

onMounted(() => {
  financeChart();
  fetchRecords();

  // onSnapshot(categoriesCollectionQuery, (querySnapshot) => {
  //   const newCategories: {
  //     id: string;
  //     text: string;
  //     color: string;
  //     date: number;
  //   }[] = [];
  //   querySnapshot.forEach((doc) => {
  //     const category = {
  //       id: doc.id,
  //       text: doc.data().text,
  //       color: doc.data().color,
  //       date: doc.data().date,
  //     };
  //     newCategories.push(category);
  //   });
  //   finance.categories = newCategories;
  // });
});

const addRecord = () => {
  newRecordCategory.value = {
    color: finance.categories[0].color,
    text: finance.categories[0].text,
    id: finance.categories[0].id,
  };
  addDoc(collection(firestore.db, "users", user.userId, "records"), {
    cost: newRecordCost.value,
    category: newRecordCategory.value,
    editMode: true,
    date: Date.now(),
    month: dateSelected.value.month,
    year: dateSelected.value.year,
  });
  newRecordCost.value = 0;
  fetchRecords();
};

const deleteRecord = (id: string) => {
  finance.records = finance.records.filter((record) => record.id !== id);
  deleteDoc(doc(firestore.db, "users", user.userId, "records", id));
  financeChart();
};

const saveRecord = async (id: string) => {
  const index = finance.records.findIndex((record) => record.id === id);
  const updateDocRef = doc(firestore.db, "users", user.userId, "records", id);
  if (finance.records[index].cost > 0) {
    updateDoc(updateDocRef, {
      cost: finance.records[index].cost,
      category: finance.records[index].category,
      editMode: false,
    });
    finance.records[index].editMode = false;
  } else if (finance.records[index].category.text == undefined || null) {
    alert("You must choose category! ");
  } else if (finance.records[index].cost <= 0) {
    alert("Cost must be greater than 0! ");
  }
  financeChart();
};

const editRecord = (id: string) => {
  const index = finance.records.findIndex((record) => record.id === id);
  finance.records[index].editMode = true;
};

const fetchRecords = async () => {
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
</script>

<template>
  <div class="finance">
    <div class="finance__header">
      <button
        :disabled="finance.categories.length == 0"
        class="finance__button"
        @click="addRecord()"
      >
        Add record <Add></Add>
      </button>

      <Datepicker
        @closed="fetchRecords"
        autoApply
        dark
        v-model="dateSelected"
        monthPicker
      ></Datepicker>
    </div>
    <div v-if="finance.categories.length == 0" class="finance__empty">
      <p>Whoops… There is no categories!</p>
      <RouterLink class="d-flex" to="/categories"
        >Add categories first!</RouterLink
      >
    </div>
    <div
      v-if="finance.records.length == 0 && finance.categories.length > 0"
      class="finance__empty"
    >
      <p>Whoops… There is no data!</p>
    </div>

    <div
      v-else
      class="finance__row"
      v-for="(record, index) in finance.records"
      :key="index"
    >
      <div class="finance__row-data">
        <span class="finance__row-cell">{{ index }}#</span>
        <!-- <span class="finance__row-cell"
          >{{ record.month }}#{{ record.year }}</span
        > -->
        <span v-if="!record.editMode" class="finance__row-cell"
          >{{ record.cost }} $</span
        >
        <span v-else class="finance__row-cell"
          ><input
            type="number"
            class="finance__row-input"
            v-model="record.cost"
          />
        </span>
        <span class="finance__row-cell" v-if="!record.editMode"
          ><small
            :style="{ 'background-color': record.category.color }"
            class="finance__row-category"
            >{{ record.category.text }}</small
          ></span
        >
        <span class="finance__row-cell" v-else>
          <select class="finance__row-select" v-model="record.category">
            <option
              v-for="(category, index) in finance.categories"
              :key="index"
              v-bind:value="{
                color: category.color,
                text: category.text,
                id: category.id,
              }"
            >
              {{ category.text }}
            </option>
          </select>
        </span>
      </div>
      <div class="finance__row-actions">
        <button
          v-if="!record.editMode"
          class="finance__row-button"
          @click="editRecord(record.id)"
        >
          <Edit></Edit>
        </button>
        <button
          v-else
          class="finance__row-button"
          @click="saveRecord(record.id)"
        >
          <Save></Save>
        </button>
        <button class="finance__row-button" @click="deleteRecord(record.id)">
          <Delete></Delete>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.finance {
  background: $bg-secondary;
  border-radius: 10px;
  width: 922px;
  height: 585px;
  overflow: scroll;
  @include max-1920 {
    height: 420px;
  }
  &__empty {
    display: flex;
    flex-flow: column;
    align-items: center;
    &-text {
      color: $white;
    }
  }
  &__row {
    border: solid 1px $gray;
    margin: 0 0 25px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $white;
    &-input {
      border-bottom: solid 1px $primary;
      border-right: none;
      background: transparent;
      color: $white;
      font-size: 20px;
      max-width: 100px;
    }
    &-select {
      background: $gray;
      color: $white;
      font-size: 18px;
      border: none;
      padding: 0 0px 0 15px;
      border-radius: 20px;
      width: 140px;
      height: 40px;
    }
    &-category {
      background: #f86a55; // To change dynamic
      color: $white;
      width: 140px;
      height: 40px;
      display: flex;
      justify-content: center;
      border-radius: 20px;
      align-items: center;
      font-size: 20px;
    }
    &-cell {
      padding: 25px;
      font-size: 20px;
      margin: 0;
      display: flex;
      align-items: center;
      min-height: 85px;
      border-right: solid 1px $gray;
    }
    &-data {
      display: flex;
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
      border-left: solid 1px $gray;
      padding: 25px;
    }
  }
  &__button {
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
    cursor: pointer;
    &:disabled {
      background: gray;
      cursor: not-allowed;
    }
  }
  &__header {
    padding: 25px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
