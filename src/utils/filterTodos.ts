import { TodoStatus } from '../enums/TodoStatus';

export function filterTodos(
  todos: TodoType[],
  selectedFilter: TodoStatus,
): TodoType[] {
  return todos.filter((todo) => {
    switch (selectedFilter) {
      case TodoStatus.Active:
        return !todo.completed;

      case TodoStatus.Completed:
        return todo.completed;

      default:
        return true;
    }
  });
}
