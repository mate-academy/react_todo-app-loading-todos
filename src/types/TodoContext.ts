import { Todo } from './Todo';

export type TodoContextValue = {
  todos: Todo[];
  todosUncompleted: number;
  todosCompleted: boolean;
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  toogleAll: () => void;
  deleteTodo: (id: number) => void;
  deleteComplitedTodo: () => void;
  updateTodo: (updatedTitle: string, id: number) => void;
  isError: boolean;
  setIsError: (isError: boolean) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
};
