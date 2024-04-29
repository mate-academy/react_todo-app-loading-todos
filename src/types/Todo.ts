export interface TodoType {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}
export interface LocalTodoType extends TodoType {
  isFake?: boolean;
}

export type LocalTodosArrayType = LocalTodoType[];
