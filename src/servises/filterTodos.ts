import { Todo } from '../types/Todo';

export const filteredTodos = (todos: Todo[], filter: string) => {
  return todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });
};
