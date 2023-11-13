import React, { useContext } from 'react';

import { StateContext } from '../../TodoStore';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const { visibleTodos } = useContext(StateContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
