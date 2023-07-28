import { Todo } from './Todo';

export type TodosContextType = {
  todos: Todo[],
  error: string,
  resetError: () => void,
  addTodo: (title: string) => void,
};
