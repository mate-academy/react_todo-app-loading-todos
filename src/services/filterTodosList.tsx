import { Todo } from '../types/Todo';

export function filterTodosList(listOfTodos: Todo[], filterBy: string) {
  return listOfTodos.filter(todo => {
    switch (filterBy) {
      case 'Active':
        return !todo.completed;

      case 'Completed':
        return todo.completed;

      default:
        return todo;
    }
  });
}
