import { Todo } from '../../types/Todo';

export type Props = {
  todos: Todo[]
  toggleStatus: (todoId: number, comleted: boolean) => void
  setErrorMessage: (type: string) => void;
  loadingTodoId: number | null;
  setLoadingTodoId: (id: number | null) => void;
  deleteTodo: (id: number) => void
  temporaryTodo: Todo | null;
  changeTitle: (id: number, title: string) => void;
};
