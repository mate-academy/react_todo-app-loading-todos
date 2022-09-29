import { Todo } from '../../types/Todo';
import { Error } from '../../Error';

export type FooterProps = {
  todoList: Todo[];
  setFilter: (input: string) => void;
  filter: string;
  setError: (title: Error | null) => void;
  deleteTodo: (todoId: number) => void;
  anyCompletedTodo: boolean;
};
