import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { Status } from '../../types/Status';

type Props = {
  todos: Todo[],
  filter: Status,
};

function filterTodos(todos: Todo[], filter: Status) {
  switch (filter) {
    case Status.Active:
      return todos.filter(todo => !todo.completed);
    case Status.Completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
}

export const TodoList: React.FC<Props> = ({ todos, filter }) => {
  const filteredTodos = useMemo(
    () => filterTodos(todos, filter),
    [todos, filter],
  );

  return (
    <>{filteredTodos.map(todo => (<TodoItem key={todo.id} todo={todo} />))}</>
  );
};
