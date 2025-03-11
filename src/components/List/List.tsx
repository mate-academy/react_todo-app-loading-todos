import React from 'react';
import { Todo } from '../../types/Todo';
import { Item } from '../Item/Item';

interface Props {
  todos: Todo[];
  isLoading: boolean;
}

export const List: React.FC<Props> = ({ todos, isLoading }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <Item key={todo.id} todo={todo} isLoading={isLoading} />
    ))}
  </section>
);
