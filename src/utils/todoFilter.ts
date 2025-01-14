import { Todo } from '../types/Todo';

export function getPreparedTodos(todoList: Todo[], filterType: string) {
  const preparedTodos = [...todoList];

  switch (filterType) {
    case 'All':
      return preparedTodos;
    case 'Completed':
      return preparedTodos.filter(todo => todo.completed);
    case 'Active':
      return preparedTodos.filter(todo => !todo.completed);
    default:
      return todoList;
  }
}
