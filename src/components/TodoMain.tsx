import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  hasTodos: boolean;
};

export const TodoMain: React.FC<Props> = ({ todos, hasTodos }) => {
  if (!hasTodos) {
    return null;
  }

  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
