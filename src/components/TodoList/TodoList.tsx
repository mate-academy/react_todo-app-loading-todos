import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  visibleTodos: Todo[],
};

export const TodoList: React.FC<Props> = ({ visibleTodos }) => {
  return (
    <section className="todoapp__main">
      {visibleTodos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
