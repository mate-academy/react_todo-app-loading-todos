/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../types/Todo';
import { TodoCard } from './TodoCard';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todoapp__main" data-cy="TodoList">
      {todos?.map(todo => (
        <li key={todo.id}>
          <TodoCard key={todo.id} todo={todo} />
        </li>
      ))}
    </ul>
  );
};
