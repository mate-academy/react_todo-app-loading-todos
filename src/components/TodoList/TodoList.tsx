import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { Status } from '../../types/Status';

type Props = {
  todos: Todo[];
  statusFilter: Status;
};

export const TodoList: React.FC<Props> = ({ todos, statusFilter }) => {
  const filteredTodos = useMemo(() => {
    switch (statusFilter) {
      case Status.Active:
        return todos.filter(todo => !todo.completed);

      case Status.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [statusFilter, todos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
