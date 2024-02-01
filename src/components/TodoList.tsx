import React, { useContext, useState, useEffect } from 'react';
import { TodoItem } from './TodoItem';
import { TodoContext } from '../contexts/TodoContext';
import { Todo } from '../types/Todo';

export const Main: React.FC = () => {
  const { todos, filterTodoByStatus, status } = useContext(TodoContext);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setVisibleTodos(filterTodoByStatus(todos, status));
  }, [todos, status]);

  return (

    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} items={todo} />
      ))}
    </section>
  );
};
