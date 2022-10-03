import { Todo } from '../../types/Todo';

export type Props = {
  todos: Todo[]
  toggleStatus: (todoId: number, comleted: boolean) => void
  setErrorMessage: (type: string) => void;
  deleteInVisibleTodos: (id: number) => void;
};
