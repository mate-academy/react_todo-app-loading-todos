import { Status } from './Status';
import { Todo } from './Todo';

export interface TodoContextProps {
  todos: Todo[];
  filter: Status;
  addTodo: (todo: Todo) => void;
  toggleCompleted: (id: number) => void;
  toggleAllCompleted: (completed: boolean) => void;
  deleteTodo: (id: number) => void;
  clearCompleted: () => void;
  updateTodoTitle: (id: number, newTitle: string) => void;
  setFilter: (filter: Status) => void;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  handlerDeleteCompleted: () => void;
}
