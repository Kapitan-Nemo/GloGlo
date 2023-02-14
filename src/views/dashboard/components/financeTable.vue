<script setup lang="ts">
import { ref, computed } from "vue";
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
import "@vuepic/vue-datepicker/dist/main.css";
import { storeToRefs } from "pinia";
import Datepicker from "@vuepic/vue-datepicker";

import icon from "@/components/dynamicIcon.vue";
import Add from "@/assets/icons/actions/add.svg?component";
import Edit from "@/assets/icons/actions/edit.svg?component";
import Delete from "@/assets/icons/actions/delete.svg?component";
import Save from "@/assets/icons/actions/save.svg?component";

const user = useUserStore();
const firestore = useFireStore();
const finance = useFinanceStore();
const { dateSelected } = storeToRefs(firestore);
const { newRecord } = storeToRefs(finance);

// const newRecord = reactive({
//   cost: 0,
//   category: {},
//   show: false,
// });

console.log(finance.categories, finance.records);

const input = ref();

const addNewRecordMode = () => {
  newRecord.value.show = !newRecord.value.show;
  // newRecord.category = finance.categories[0];
  setTimeout(() => {
    input.value.focus();
  }, 100);
};

const createRecord = () => {
  if (newRecord.value.cost > 0) {
    addDoc(collection(firestore.db, "users", user.userId, "records"), {
      cost: newRecord.value.cost,
      category: newRecord.value.category,
      editMode: false,
      date: Date.now(),
      month: dateSelected.value.month,
      year: dateSelected.value.year,
    });
    newRecord.value.cost = 0;
    newRecord.value.show = false;
    finance.fetchRecords();
  } else {
    alert("Please enter a valid cost");
  }
};

const updateRecord = async (id: string) => {
  const index = finance.records.findIndex((record) => record.id === id);
  const updateDocRef = doc(firestore.db, "users", user.userId, "records", id);
  if (finance.records[index].cost > 0) {
    updateDoc(updateDocRef, {
      cost: finance.records[index].cost,
      category: finance.records[index].category,
      editMode: false,
    });
    finance.records[index].editMode = false;
  } else {
    alert("Please enter a valid cost");
  }
};

const deleteRecord = (id: string) => {
  finance.records = finance.records.filter((record) => record.id !== id);
  deleteDoc(doc(firestore.db, "users", user.userId, "records", id));
};

const editRecord = (id: string) => {
  const index = finance.records.findIndex((record) => record.id === id);
  finance.records[index].editMode = true;
};

const show = ref(false);
const currentIndex = ref(0);
const currentCategory = ref("");

const filterRecords = computed(() => {
  return finance.records.filter(
    (record) => record.category.text == currentCategory.value
  );
});

const recordsDataCombine = computed(() => {
  const arr = [];
  for (let i = 0; i < finance.getChartLabels.length; i++) {
    arr.push({
      label: finance.getChartLabels[i],
      color: finance.getChartColors[i],
      cost: finance.costs[i],
    });
  }
  return arr;
});
</script>

<template>
  <div class="finance">
    <div class="finance__header">
      <button
        :disabled="finance.categories.length == 0"
        class="finance__button"
        @click="addNewRecordMode()"
      >
        Add expense <Add />
      </button>
      <Datepicker
        @closed="finance.fetchRecords()"
        autoApply
        dark
        v-model="dateSelected"
        monthPicker
        :clearable="false"
      ></Datepicker>
    </div>
    <p class="finance__empty" v-if="finance.categories.length <= 0">
      <icon path="actions" name="add-category" />
      <RouterLink to="/categories" class="finance__empty-link">
        add categories</RouterLink
      >
    </p>
    <div
      v-if="
        newRecord.show ||
        (finance.records.length <= 0 && finance.categories.length > 0)
      "
      class="finance__row"
    >
      <div class="finance__row-data">
        <span class="finance__row-cell">
          <input
            v-model="newRecord.cost"
            type="number"
            class="finance__row-input"
            ref="input"
          />
          $
        </span>
        <span class="finance__row-cell">
          <select
            v-model="newRecord.category"
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
        <button class="finance__row-button" @click="createRecord">
          <Save />
        </button>
        <button class="finance__row-button" @click="newRecord.show = false">
          <Delete></Delete>
        </button>
      </div>
    </div>
    <div v-for="(record, index) in recordsDataCombine" :key="index">
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
              (show = !show),
                (currentIndex = index),
                (currentCategory = record.label)
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
                @click="updateRecord(record.id)"
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
    min-height: 245px;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    text-decoration: underline;
    &-link {
      color: $primary;
      font-size: 20px;
      margin: 15px 0 0 0px;
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
      border-left: none;
      border-top: none;
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
      background: #80808030;
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
