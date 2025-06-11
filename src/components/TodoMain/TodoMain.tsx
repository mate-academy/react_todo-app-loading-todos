import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from './TodoItem';
import './TodoMain.scss';

type TodoMainProps = {
  todos: Todo[];
};

export const TodoMain: React.FC<TodoMainProps> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
