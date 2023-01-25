import { ref } from "vue";
import { useFinanceStore } from "@/stores/finance";
import { useFireStore } from "@/stores/firestore";

import type { IRecords } from "@/utils/interface";
import { storeToRefs } from "pinia";

const firestore = useFireStore();
const finance = useFinanceStore();
const { records } = storeToRefs(firestore);

export async function fetchRecords() {
  console.log("fetchRecords");
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
}
console.log("fetchRecords");
