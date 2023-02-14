export interface IRecords {
  id: string;
  cost: number;
  month: number;
  year: number;
  editMode: boolean;
  category: {
    id: string;
    text: string;
    color: string;
    date: number;
  };
}

export interface ICategories {
  id: string;
  text: string;
  color: string;
  date: number;
}

export interface IGroupRecords {
  label: string;
  color: string;
  cost: number;
}

export interface INewRecord {
  cost: number;
  category: ICategories;
  show: boolean;
}
