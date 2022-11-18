export interface IRecords {
  id: string;
  cost: number;
  month: number;
  year: number;
  editMode: boolean;
  category: {
    text: string;
    color: string;
    id: string;
  };
}

export interface ICategories {
  id: string;
  text: string;
  color: string;
  date: number;
}
