import { TodoStatusFilter } from './FilterStatus';

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export const getFilteredTodos = (todos: Todo[], status: TodoStatusFilter) => {
  let filteredTodos = [...todos];

  if (status !== TodoStatusFilter.ALL) {
    filteredTodos = filteredTodos.filter(todo => {
      if (status === TodoStatusFilter.COMPLETED) {
        return todo.completed;
      }

      return !todo.completed;
    });
  }

  return filteredTodos;
};
