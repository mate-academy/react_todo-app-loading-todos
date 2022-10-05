export interface Todo {
  map(arg0: (x: Todo) => unknown): Todo[];
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export type TodoTitle = {
  completed: boolean;
};
