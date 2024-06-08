import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </section>
);
