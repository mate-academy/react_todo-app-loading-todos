import { Action } from '../State/State';
import { deleteAllCompleted } from '../api/todos';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export function handleDeleteAll(
  todos: Todo[],
  dispatch: React.Dispatch<Action>,
) {
  dispatch({ type: 'clearAll', payload: true });

  deleteAllCompleted(todos)
    .then(() => dispatch({ type: 'updatedAt' }))
    .catch(() => dispatch(
      { type: 'setError', payload: 'Unable to delete a todos' },
    ))
    .finally(() => dispatch({ type: 'clearAll', payload: false }));
}

export function countTodos(todos: Todo[]): number {
  const uncompletedTodo = todos.filter(todo => {
    return !todo.completed;
  });

  return uncompletedTodo.length;
}

export function getPreparedTodos(todos: Todo[], filterBy: Filter): Todo[] {
  switch (filterBy) {
    case Filter.active:
      return todos.filter(todo => !todo.completed);

    case Filter.completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
}

export function isCompletedTodo(todos: Todo[]): boolean {
  return todos.some(todo => todo.completed);
}

export function isActiveTodo(todos: Todo[]): boolean {
  return todos.some(todo => !todo.completed);
}
