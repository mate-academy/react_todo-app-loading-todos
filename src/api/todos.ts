import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';
import { Filter } from '../types/Filter';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const filterTodos = (
  todos: Todo[],
  filterParam: Filter,
) => {
  const visibleTodos = filterParam !== Filter.All
    ? todos.filter(todo => {
      if (filterParam === Filter.Active) {
        return !todo.completed;
      }

      return todo.completed;
    })
    : todos;

  return visibleTodos;
};

export const countActiveTodos = (todos: Todo[]) => {
  const activeTodos = todos.filter(todo => !todo.completed);

  return activeTodos.length;
};

export const checkCompletedTodos = (todos: Todo[]) => {
  return todos.some(todo => todo.completed);
};

// Add more methods here
