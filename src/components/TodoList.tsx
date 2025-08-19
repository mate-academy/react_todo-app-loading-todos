import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
};

// eslint-disable-next-line max-len
export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(e => (
      <TodoItem key={e.id} data-cy="Todo" todo={e} />
    ))}
  </section>
);
