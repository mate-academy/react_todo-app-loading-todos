import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TodoItem />
    </section>
  );
};
