import React from 'react';
import { Todo as TodoType } from '../../types/todo';
import { Todo } from '../Todo';

type Props = {
  visibleTodos: TodoType[];
};

export const TodoList: React.FC<Props> = ({ visibleTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is all visible todo */}
      {visibleTodos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
