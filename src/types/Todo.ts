export type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

export type TodoAdd = Omit<Todo, 'id'>;
