export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  editMode?: boolean;
  loadingMode?: boolean;
}
