import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItems } from './TodoItems';

interface Props {
  visibleTodos: Todo[];
}

export const TodoList: React.FC<Props> = ({ visibleTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItems key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
