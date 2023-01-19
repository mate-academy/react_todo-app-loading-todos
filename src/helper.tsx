import { Todo } from './types/Todo';

export const getVisibleTodos = (todos: Todo[], filter: string) => (
  todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  }));
