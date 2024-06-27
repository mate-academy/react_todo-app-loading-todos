/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { TodoItem } from '../Todo/TodoItem';
import { Todo } from '../../types/Todo';
import { MainProps } from '../../types/types';

export const Main: React.FC<MainProps> = ({
  filteredTodos,
  todos,
  setTodos,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map((todo: Todo) => (
        <TodoItem
          key={todo?.id}
          todo={todo}
          setTodos={setTodos}
          todos={todos}
        />
      ))}
    </section>
  );
};
