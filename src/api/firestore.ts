import { useUserStore } from "@/stores/auth";
import { useFireStore } from "@/stores/firestore";
import { collection, getDocs, query, where } from "@firebase/firestore";

const firestore = useFireStore();
const user = useUserStore();

export async function apiRecord(month: number) {
  await getDocs(
    query(
      collection(firestore.db, "users", user.userId, "records"),
      where("month", "==", month)
    )
  );
}
//get all categories for current user
export function apiCategories() {
  collection(firestore.db, "users", user.userId, "categories");
}
