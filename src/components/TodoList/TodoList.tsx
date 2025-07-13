import { Todo } from '../../types/Todo';
import React from 'react';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <>
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </>
);
