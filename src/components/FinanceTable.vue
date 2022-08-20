<template>
  <div class="finance">
    <div class="finance__header">
      <button class="finance__button" @click="addRecord()">
        Add record <AddIcon></AddIcon>
      </button>
    </div>
    <div v-if="finance.records[0] == null" class="finance__empty">
      <EmptyIcon></EmptyIcon>
      <p class="finance__empty-text">Whoops… There is no data!</p>
    </div>
    <div
      class="finance__row"
      v-for="(record, index) in financeMonthFilter"
      :key="index"
    >
      <div class="finance__row-data">
        <span class="finance__row-cell">{{ index }}#</span>
        <span class="finance__row-cell"
          >{{ record.month }}#{{ record.year }}</span
        >
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
            <option disabled value="">Select</option>
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
          <EditIcon></EditIcon>
        </button>
        <button
          v-else
          class="finance__row-button"
          @click="saveRecord(record.id)"
        >
          <SaveIcon></SaveIcon>
        </button>
        <button class="finance__row-button" @click="deleteRecord(record.id)">
          <RemoveIcon></RemoveIcon>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
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
  increment,
} from "firebase/firestore";
import { financeChart } from "@/composables/financechart.js";

import AddIcon from "@/components/icons/IconAdd.vue";
import EditIcon from "@/components/icons/IconEdit.vue";
import RemoveIcon from "@/components/icons/IconRemove.vue";
import SaveIcon from "@/components/icons/IconSave.vue";
import EmptyIcon from "@/components/icons/IconEmpty.vue";
const userid = JSON.parse(localStorage.getItem("userId") || "{}");
const user = useUserStore();
const firestore = useFireStore();
const newRecordCost = ref(0);
const newRecordCategory = ref("");
const finance = useFinanceStore();
const date = new Date();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();

//Firebase refs
const recordsCollectionRef = collection(
  firestore.db,
  "users",
  userid,
  "records"
);
const categoriesCollectionRef = collection(
  firestore.db,
  "users",
  userid,
  "categories"
);

const recordsCollectionQuery = query(
  recordsCollectionRef,
  orderBy("date", "desc")
);
const categoriesCollectionQuery = query(categoriesCollectionRef);
const financeMonthFilter = computed(() => {
  return finance.records.filter(
    (n) => n.month == currentMonth && n.year == currentYear
  );
});
onMounted(() => {
  const finance = useFinanceStore();
  onSnapshot(recordsCollectionQuery, (querySnapshot) => {
    const newRecords: {
      id: string;
      cost: number;
      month: number;
      year: number;
      category: {
        text: string;
        color: string;
        id: string;
        total: number;
        month: number;
        year: number;
      };
      editMode: boolean;
    }[] = [];
    querySnapshot.forEach((doc) => {
      const record = {
        id: doc.id,
        cost: doc.data().cost,
        category: doc.data().category,
        editMode: doc.data().editMode,
        month: doc.data().month,
        year: doc.data().year,
      };
      newRecords.push(record);
    });
    finance.records = newRecords;
  });

  onSnapshot(categoriesCollectionQuery, (querySnapshot) => {
    const newCategories: {
      text: string;
      id: string;
      color: string;
      total: number;
      date: number;
    }[] = [];
    querySnapshot.forEach((doc) => {
      const category = {
        id: doc.id,
        text: doc.data().text,
        color: doc.data().color,
        total: doc.data().total,
        date: doc.data().date,
      };
      newCategories.push(category);
    });
    finance.categories = newCategories;
  });
});

const addRecord = () => {
  addDoc(collection(firestore.db, "users", user.userId, "records"), {
    cost: newRecordCost.value,
    category: newRecordCategory.value,
    editMode: true,
    date: Date.now(),
    month: currentMonth,
    year: currentYear,
  });
  newRecordCost.value = 0;
  newRecordCategory.value = "";
};

const deleteRecord = (id: string) => {
  const index = finance.records.findIndex((record) => record.id === id);
  const updateDocCategory = doc(
    firestore.db,
    "users",
    user.userId,
    "categories",
    finance.records[index].category.id
  );
  updateDoc(updateDocCategory, {
    total: increment(-finance.records[index].cost),
  });

  finance.records = finance.records.filter((record) => record.id !== id);
  deleteDoc(doc(firestore.db, "users", user.userId, "records", id));
  financeChart();
};

const saveRecord = async (id: string) => {
  const index = finance.records.findIndex((record) => record.id === id);
  const updateDocRef = doc(firestore.db, "users", user.userId, "records", id);

  if (finance.records[index].cost > 0) {
    const updateDocCategory = doc(
      firestore.db,
      "users",
      user.userId,
      "categories",
      finance.records[index].category.id
    );

    const financeValueFilter = computed(() => {
      return finance.records.filter(
        (n) => n.category.text == finance.records[index].category.text
      );
    });

    const financeValue = computed(() => {
      return financeValueFilter.value.reduce(
        (financeValue: number, record: { cost: number }) =>
          record.cost + financeValue,
        0
      );
    });

    updateDoc(updateDocCategory, {
      total: financeValue.value,
      month: currentMonth,
      year: currentYear,
    });
    updateDoc(updateDocRef, {
      cost: finance.records[index].cost,
      category: finance.records[index].category,
      editMode: false,
    });
    finance.records[index].editMode = false;
  } else if (finance.records[index].category.text == undefined) {
    alert("You must choose category! ");
  } else {
    alert("Cost can't be 0");
  }
  financeChart();
};

const editRecord = (id: string) => {
  const index = finance.records.findIndex((record) => record.id === id);
  finance.records[index].editMode = true;
};
console.log("Finance categories:", finance.categories);
</script>

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
  }
  &__header {
    padding: 25px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
