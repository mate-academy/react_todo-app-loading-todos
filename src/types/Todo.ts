export interface Todo {
  remove(): unknown;
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}
