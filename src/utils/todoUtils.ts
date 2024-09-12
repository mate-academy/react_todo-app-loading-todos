import { Todo } from '../types/Todo';
import { TodoStatus } from '../components/enum/enum';

export const getVisibleTodos = (todos: Todo[], status: TodoStatus) => {
  let visibleTodos = [...todos];

  if (status !== TodoStatus.All) {
    visibleTodos = visibleTodos.filter(todo => {
      return status === TodoStatus.Active ? !todo.completed : todo.completed;
    });
  }

  return visibleTodos;
};
