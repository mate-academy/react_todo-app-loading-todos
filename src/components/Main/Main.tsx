/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { TodoItem } from '../Todo/TodoItem';
import { Todo } from '../../types/Todo';
import { IsActiveError } from '../../types/types';

interface MainProps {
  filteredTodos: Todo[];
  todos: Todo[];
  setTodos: (arg: Todo[]) => void;
  setIsError: (arg: IsActiveError) => void;
}

export const Main: React.FC<MainProps> = ({
  filteredTodos,
  todos,
  setTodos,
  setIsError,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map((todo: Todo) => (
        <TodoItem
          key={todo?.id}
          todo={todo}
          setTodos={setTodos}
          setIsError={setIsError}
          todos={todos}
        />
      ))}
    </section>
  );
};
