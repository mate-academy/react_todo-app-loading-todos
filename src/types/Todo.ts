export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface TodoItemProps {
  todo: Todo;
  loading: boolean;
  isActive: number | undefined;
}

export interface TodoListProps {
  filteredTodos: Todo[];
  loading: boolean;
  isActive: number | undefined;
}
