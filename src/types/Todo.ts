export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export type TodoStatus = 'all' | 'active' | 'completed';
