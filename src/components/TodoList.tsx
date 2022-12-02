import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const todos = useContext(AppContext).visibleTodos;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
