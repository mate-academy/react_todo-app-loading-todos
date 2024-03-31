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
  const { list, tempTodo } = useTodosContext();

  const listToGo = useMemo(() => {
    return getFilteredItems(list, query);
  }, [list, query]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {listToGo.map((todo: Todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
      {tempTodo && <TodoItem todo={tempTodo} />}
    </section>
  );
};
