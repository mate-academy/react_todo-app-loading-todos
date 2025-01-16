/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';

import { Todo } from '../../types/Todo';

import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = React.memo(function TodoList({
  todos,
}) {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
});
