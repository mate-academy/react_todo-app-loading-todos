import { FilterParam } from '../types/FilterParam';
import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const filterTodos = (
  todos: Todo[],
  param: FilterParam,
) => {
  const visibleTodos = param !== FilterParam.All
    ? todos.filter(todo => {
      switch (param) {
        case FilterParam.Active:
          return !todo.completed;

        case FilterParam.Completed:
          return todo.completed;

        default:
          return todo;
      }
    })
    : todos;

  return visibleTodos;
};

export const counterOfActiveTodos = (todos: Todo[]) => {
  const activeTodos = todos.filter(todo => !todo.completed);

  return activeTodos.length;
};

export const checkCompletedTodo = (todos: Todo[]) => {
  return todos.some(todo => todo.completed);
};
