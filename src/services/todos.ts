import { OPTIONS_TODOS } from '../constans';
import { Todo } from '../types/Todo';

export const getTodosByOptions = (option: string, todos: Todo[]) => {
  switch (option) {
    case OPTIONS_TODOS.COMPLETED:
      return todos.filter(todo => todo.completed);

    case OPTIONS_TODOS.ACTIVE:
      return todos.filter(todo => !todo.completed);

    default:
      return todos;
  }
};

export const getTodos = {
  active(todos: Todo[]) {
    return todos.filter(todo => !todo.completed).length;
  },
  isOneCompleted(todos: Todo[]) {
    return todos.some(todo => todo.completed);
  },
  isEveryCompleted(todos: Todo[]) {
    return todos.every(todo => todo.completed);
  },
};
