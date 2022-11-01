import { useUserStore } from "@/stores/auth";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { useFireStore } from "@/stores/firestore";
const firestore = useFireStore();
const user = useUserStore();
//get all record for current user
export async function apiRecord(param: string | number) {
  getDocs(
    query(
      collection(firestore.db, "users", user.userId, "records"),
      where("month", "==", param)
    )
  );
}

//get all categories for current user
export async function apiCategories() {
  collection(firestore.db, "users", user.userId, "categories");
}
