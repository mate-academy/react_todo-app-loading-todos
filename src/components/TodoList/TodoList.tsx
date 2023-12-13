import React from 'react';
import { useTodosContext } from '../store';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useTodosContext();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
