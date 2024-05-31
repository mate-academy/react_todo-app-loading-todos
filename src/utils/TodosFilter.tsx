import { Todo } from '../types/Todo';

export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const filterTodo = (todos: Todo[], filter: Status): Todo[] => {
  const allTodos = [...todos];

  switch (filter) {
    case Status.All:
      return allTodos;
    case Status.Active:
      return allTodos.filter(todo => !todo.completed);
    case Status.Completed:
      return allTodos.filter(todo => todo.completed);
    default:
      return allTodos;
  }
};
