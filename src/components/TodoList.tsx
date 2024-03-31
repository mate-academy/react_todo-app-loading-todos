import React from 'react';
import { Todo } from '../types/Todo';
import { Todos } from './Todos';

interface Props {
  preparedTodos: Todo[];
}

export const TodoList: React.FC<Props> = ({ preparedTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <Todos preparedTodos={preparedTodos} />
    </section>
  );
};
