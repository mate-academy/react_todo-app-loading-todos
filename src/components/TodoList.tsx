import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  isLoading: boolean;
};

export const TodoList: React.FC<Props> = ({ todos, isLoading }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TodoItem todos={todos} isLoading={isLoading} />
    </section>
  );
};
