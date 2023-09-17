import React from 'react';
import { TodoItem } from './TodoItem';
import { useTodo } from '../hooks/useTodo';

export const TodoList: React.FC = React.memo(() => {
  const { visibleTodos } = useTodo();

  return (
    <section className="todoapp__main">
      {visibleTodos().map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
});
