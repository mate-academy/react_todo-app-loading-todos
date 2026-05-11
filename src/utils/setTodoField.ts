import { Todo } from '../types/Todo';

export const setFieldTodo = <K extends keyof Todo>(
  todo: Todo,
  field: K,
  value: Todo[K],
) => {
  const changedTodo = {
    ...todo,
    [field]: value,
  };

  return changedTodo;
};
