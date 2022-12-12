import { useCallback, useMemo } from 'react';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';
import { TodoItem } from './Todo';

type Props = {
  todos: Todo[];
  status: Status;
};

export const TodoList: React.FC<Props> = ({ todos, status }) => {
  const getVisibleTodos = useCallback((): Todo[] => {
    return todos.filter(todo => {
      switch (status) {
        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;

        case Status.All:
        default:
          return todos;
      }
    });
  }, [todos, status]);

  const visibleTodos = useMemo(
    getVisibleTodos,
    [todos, status],
  );

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
