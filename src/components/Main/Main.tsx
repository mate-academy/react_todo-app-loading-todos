import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { ErrorsMessages } from '../../types/ErrorsMessages';

type Props = {
  todos: Todo[],
  handleChecker: (id: number, data: unknown) => void,
  removeTodo: (id: number) => void,
  isLoader: boolean,
  loaderId: number,
  errorMessage: (message: ErrorsMessages) => void
};

export const Main: React.FC<Props> = ({
  todos,
  handleChecker,
  removeTodo,
  isLoader,
  loaderId,
  errorMessage,
}) => {
  return (
    <section className="todoapp__main">
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          handleChecker={handleChecker}
          removeTodo={removeTodo}
          isLoader={isLoader}
          loaderId={loaderId}
          errorMessage={errorMessage}
        />
      ))}
    </section>
  );
};
