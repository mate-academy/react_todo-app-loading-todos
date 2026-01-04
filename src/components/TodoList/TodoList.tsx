import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoList/TodoItem';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => (
  <>
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </>
);
