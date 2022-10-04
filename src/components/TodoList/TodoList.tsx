import React from 'react';
import { Todo } from '../Todo/Todo';

export const TodoList: React.FC = () => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <Todo />
    </section>
  );
};
