import { Todo } from '../types/Todo';

export const getCompletedTodos = (arr: Todo[]): Todo[] => {
  return arr.filter(elem => elem.completed);
};
