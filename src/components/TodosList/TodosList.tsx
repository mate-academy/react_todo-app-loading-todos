import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Error } from '../../types/Error';

type Props = {
  visibleTodos: Todo[]
  onChangeIsError: (e: Error) => void
};

export const TodosList: React.FC<Props> = ({
  visibleTodos, onChangeIsError,
}) => {
  return (
    <section className="todoapp__main">
      {visibleTodos.map(todo => (
        <TodoInfo
          todo={todo}
          key={todo.id}
          onChangeIsError={onChangeIsError}
        />
      ))}
    </section>
  );
};
