import { Todo } from '../../types/Todo';
import { Error } from '../../Error';

export type TodoProps = {
  selectedTodo: number | null;
  selectTodo: (todo: Todo,) => void;
  todos: Todo[];
  updateTodoCompleted: (todoId: number, state: boolean) => void;
  setError: (title: Error | null) => void
  deleteTodo: (todo: Todo) => void;
  isLoading: boolean;
  todoTitle: string;
};
