import { Todo } from '../../types/Todo';
import { Error } from '../../Error';

export type TodoProps = {
  loadingAll: boolean;
  todos: Todo[];
  updateTodoCompleted: (todoId: number, state: boolean) => void;
  setError: (title: Error | null) => void
  deleteTodo: (todoId: number) => void;
  isLoading: boolean;
  todoTitle: string;
};
