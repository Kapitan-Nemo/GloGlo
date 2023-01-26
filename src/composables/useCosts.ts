import { useFinanceStore } from "@/stores/finance";
import type { ICategories } from "@/utils/interface";

const finance = useFinanceStore();

export function financeCosts() {
  finance.chartCosts = [];
  console.log("Odpalam finance Costs");
  const categoriesCost = (item: ICategories) => {
    finance.chartCosts.push(
      finance.records
        .filter((element) => element.category.text == item.text)
        .map((data) => data.cost)
        .reduce((a, b) => a + b, 0)
    );
  };
  // Filter duplicate Categories
  const searchCategories = [
    ...new Map(
      finance.records
        .map((data) => data.category)
        .map((item) => [item.id, item])
    ).values(),
  ];
  const value = searchCategories.forEach(categoriesCost);
  return value;
}
