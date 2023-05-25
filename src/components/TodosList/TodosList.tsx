import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[],
};

export const TodosList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(({ id, title, completed }) => (
        <TodoItem key={id} title={title} completed={completed} />
      ))}
    </section>
  );
};
