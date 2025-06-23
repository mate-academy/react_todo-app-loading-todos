import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="todoapp__main" data-cy="TodoList">
    <ul>
      {todos.map(({ id, title, completed }) => (
        <TodoItem key={id} title={title} completed={completed} />
      ))}
    </ul>
  </section>
);
