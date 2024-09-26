/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Todo } from '../../types/Todo';
import { Item } from '../Item';

type Props = {
  todos: Todo[];
};

export const Main: React.FC<Props> = ({ todos }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <Item key={todo.id} todo={todo} />
    ))}
  </section>
);
