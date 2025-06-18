import { Todo } from '../types/Todo';

export type FilterStatus = 'all' | 'active' | 'completed';

export type TodoListProps = {
  todos: Todo[];
  isLoading: boolean;
  selectedTodoId: number | null;
  handleToggleStatus: (id: number) => void;
  handleDelete: (id: number) => void;
};
