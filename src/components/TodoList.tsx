import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  filteredTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ filteredTodos }) => {
  return (
    <ul className="todoapp__main" data-cy="TodoList">
      <TodoItem filteredTodos={filteredTodos} />
    </ul>
  );
};
