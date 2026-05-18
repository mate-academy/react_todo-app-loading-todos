import { Todo } from '../types/Todo';

export function filterTodos(
  todos: Todo[] | null,
  completed: boolean | null,
): Todo[] | null {
  if (!todos) {
    return null;
  }

  if (completed !== null) {
    return todos.filter(todo => todo.completed === completed);
  }

  return todos;
}
