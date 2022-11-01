export interface Records {
  id: string;
  cost: number;
  month: number;
  year: number;
  category: {
    text: string;
    color: string;
    id: string;
  };
  editMode: boolean;
}
