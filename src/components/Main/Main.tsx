// import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[],
  handleChecker: (id: number, data: unknown) => void,
  removeTodo: (id: number) => void,
};

export const Main: React.FC<Props> = ({
  todos,
  handleChecker,
  removeTodo,
}) => {
  const isMain = todos.length > 0;

  return (
    <section className="todoapp__main">
      {isMain && (
        todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            handleChecker={handleChecker}
            removeTodo={removeTodo}
          />
        ))
      )}
    </section>
  );
};
