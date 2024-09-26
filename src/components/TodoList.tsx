/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useMemo } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { getFilteredItems } from '../services/getFilteredItems';
import { TodoItem } from './TodoItem';
import { useTodosContext } from './useTodosContext';

type Props = {
  query: Status;
};

export const TodoList: React.FC<Props> = ({ query }) => {
  const { todos, tempTodo } = useTodosContext();

  const todosToGo = useMemo(() => {
    return getFilteredItems(todos, query);
  }, [todos, query]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosToGo.map((todo: Todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
      {tempTodo && <TodoItem todo={tempTodo} />}
    </section>
  );
};
