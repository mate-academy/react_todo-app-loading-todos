import { USER_ID } from '../../../api/todos';
import { Todo } from '../../../types/Todo';

export const createTodo = (title: string): Todo => {
  return {
    id: +new Date(),
    userId: USER_ID,
    title,
    completed: false,
  };
};
