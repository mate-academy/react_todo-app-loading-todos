import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  visiebleTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ visiebleTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visiebleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
