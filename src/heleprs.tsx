import { Todo } from './types/Todo';

export const swithCase = (value: string, todos: Todo[]) => {
  switch (value) {
    case 'Active':
      return todos.filter(todo => todo.completed === false);
    case 'Completed':
      return todos.filter(todo => todo.completed === true);
    default:
      return todos;
  }
};
