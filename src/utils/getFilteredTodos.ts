import { Todo, TodoStatus } from '../types/Todo';

type FilterProps = {
  todos: Todo[];
  status: TodoStatus;
};

export function getFilteredTodos({ todos, status }: FilterProps) {
  switch (status) {
    case 'all':
      return todos;
    case 'active':
      return todos.filter(todo => todo.completed === false);
    case 'completed':
      return todos.filter(todo => todo.completed === true);
    default:
      return todos;
  }
}
