import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

type Prop = {
  visibleTodos: Todo[];
};

export const TodoList: React.FC<Prop> = ({ visibleTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map((todo: Todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
