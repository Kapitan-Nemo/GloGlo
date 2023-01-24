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
} from "firebase/firestore";
import { financeChart } from "@/composables/financeChart.js";
import { storeToRefs } from "pinia";
import "@vuepic/vue-datepicker/dist/main.css";
import type { ICategories, IRecords } from "@/utils/interface";
import Datepicker from "@vuepic/vue-datepicker";

import icon from "@/components/dynamicIcon.vue";
import Add from "@/assets/icons/actions/add.svg?component";
import Edit from "@/assets/icons/actions/edit.svg?component";
import Delete from "@/assets/icons/actions/delete.svg?component";
import Save from "@/assets/icons/actions/save.svg?component";

const user = useUserStore();
const firestore = useFireStore();
const finance = useFinanceStore();
const { dateSelected, records } = storeToRefs(firestore);

const dataChart = ref<Array<number>>([]);
const newRecordCost = ref(0);
const newRecordCategory = ref({
  color: "",
  text: "",
  id: "",
});

const financeColor = computed(() => {
  const arr = finance.records.map((data) => data.category.color);
  return [...new Map(arr.map((item) => [item, item])).values()];
});

const financeLabel = computed(() => {
  const arr = finance.records.map((data) => data.category.text);
  return [...new Map(arr.map((item) => [item, item])).values()];
});

const categoriesCost = (item: ICategories) => {
  const searchFinanceRecords = finance.records.filter(
    (element) => element.category.text == item.text
  );
  dataChart.value.push(
    searchFinanceRecords.map((data) => data.cost).reduce((a, b) => a + b, 0)
  );
};

const searchCategories = [
  ...new Map(
    finance.records.map((data) => data.category).map((item) => [item.id, item])
  ).values(),
];
searchCategories.forEach(categoriesCost);

//combine financeColor and financeLabel and dataChart into one array
const recordsDataCombine = computed(() => {
  const arr = [];
  for (let i = 0; i < financeLabel.value.length; i++) {
    arr.push({
      label: financeLabel.value[i],
      color: financeColor.value[i],
      cost: dataChart.value[i],
    });
  }
  return arr;
});

onMounted(() => {
  financeChart();
  fetchRecords();
});

const saveNewRecord = () => {
  addDoc(collection(firestore.db, "users", user.userId, "records"), {
    cost: newRecordCost.value,
    category: newRecordCategory.value,
    editMode: false,
    date: Date.now(),
    month: dateSelected.value.month,
    year: dateSelected.value.year,
  });
  newRecordCost.value = 0;
  addNewRecord.value = false;
  fetchRecords();
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

const deleteRecord = (id: string) => {
  finance.records = finance.records.filter((record) => record.id !== id);
  deleteDoc(doc(firestore.db, "users", user.userId, "records", id));
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
    newRecords.value.unshift(record);
  });
  finance.records = newRecords.value;
};

const show = ref(false);
const addNewRecord = ref(false);
const currentIndex = ref(0);
const currentCategory = ref("");
const showMore = async (
  show: boolean,
  currentIndex: number,
  currentCategory: string
) => {
  console.log("test");
  console.log(show);
  console.log(currentIndex);
  console.log(currentCategory);
};

const filterRecords = computed(() => {
  return finance.records.filter(
    (record) => record.category.text == currentCategory.value
  );
});
</script>

<template>
  <div class="finance">
    <div class="finance__header">
      <button
        :disabled="finance.categories.length == 0"
        class="finance__button"
        @click="addNewRecord = !addNewRecord"
      >
        Add expense <Add />
      </button>
      <Datepicker
        @closed="fetchRecords"
        autoApply
        dark
        v-model="dateSelected"
        monthPicker
        :clearable="false"
      ></Datepicker>
    </div>
    <div v-for="(record, index) in recordsDataCombine" :key="index">
      <div v-if="index == 0 && addNewRecord">
        <div class="finance__row">
          <div class="finance__row-data">
            <span class="finance__row-cell">
              <input
                v-model="newRecordCost"
                type="number"
                class="finance__row-input"
                placeholder="Cost"
              />
            </span>
            <span class="finance__row-cell">
              <select
                v-model="newRecordCategory"
                class="finance__row-select"
                name="category"
              >
                <option
                  v-for="category in finance.categories"
                  :key="category.id"
                  :value="category"
                >
                  {{ category.text }}
                </option>
              </select>
            </span>
          </div>
          <div class="finance__row-actions">
            <button class="finance__row-button" @click="saveNewRecord">
              <Save />
            </button>
          </div>
        </div>
      </div>
      <div class="finance__row">
        <div class="finance__row-data">
          <span class="finance__row-cell">{{ index }}#</span>
          <span class="finance__row-cell">{{ record.cost }}$</span>
          <span class="finance__row-cell"
            ><small
              :style="{ 'background-color': record.color }"
              class="finance__row-category"
              >{{ record.label }}</small
            ></span
          >
        </div>
        <div class="finance__row-actions">
          <button
            class="finance__row-button"
            @click="
              showMore(
                (show = !show),
                (currentIndex = index),
                (currentCategory = record.label)
              )
            "
          >
            <icon
              :class="show && index == currentIndex ? 'rotate' : ''"
              path="actions"
              name="more"
            />
          </button>
        </div>
      </div>
      <div v-if="show && index == currentIndex">
        <div v-for="(record, index) in filterRecords" :key="index">
          <div class="finance__row">
            <div class="finance__row-data">
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
              <button
                class="finance__row-button"
                @click="deleteRecord(record.id)"
              >
                <Delete></Delete>
              </button>
            </div>
          </div>
        </div>
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
  overflow: auto;
  svg {
    transition: 0.3s ease-in-out;
  }
  .rotate {
    transform: rotate(180deg);
    transition: 0.3s ease-in-out;
  }
  &::-webkit-scrollbar {
    display: none; /* Chrome and Safari */
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
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

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
      padding: 5px 10px 5px 10px;
      margin: 0 auto;
      border-radius: 15px;
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
