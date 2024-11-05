export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface IAddTodo {
  userId: number;
  title: string;
  completed: boolean;
}
