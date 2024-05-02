import React from 'react';

import { useContext } from 'react';
import { TodoItem } from '../TodoItem';

import { TodoListContext } from '../../contexts/TodoListContext';

export const TodoList = () => {
  const { todos } = useContext(TodoListContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} title={todo.title} status={todo.completed} />
      ))}
    </section>
  );
};
