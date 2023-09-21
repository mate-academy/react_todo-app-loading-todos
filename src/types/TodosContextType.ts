import { Status } from './Status';
import { Todo } from './Todo';

export type TodosContextType = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
  deleteTodo: (id: number) => void;
  updateTodoTitle: (id: number, newTitle: string) => void;
  selectedStatus: Status;
  setSelectedStatus: (status: Status) => void;
  errorMessage: string,
  setErrorMessage: (message: string) => void,
  removeErrorIn3sec: () => void,
  notCompletedTodos: number,
};
