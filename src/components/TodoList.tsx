/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  isUpdating: boolean;
};

export const TodoList: React.FC<Props> = ({ todos, isUpdating }) => (
  <>
    {todos.map((todo: Todo) => (
      <TodoItem key={todo.id} todo={todo} isUpdating={isUpdating} />
    ))}
  </>
);
