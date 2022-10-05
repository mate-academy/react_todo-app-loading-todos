import { Todo } from '../../types/Todo';

export type FooterProps = {
  todoList: Todo[];
  setFilter: (input: string) => void;
  filter: string;
  deleteAllTodos: () => void;
  anyCompletedTodo: boolean;
};
