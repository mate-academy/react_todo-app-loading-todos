import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[],
  onError: (isError: Error) => void,
  isLoading: boolean
};

export const TodoList: React.FC<Props> = ({ todos, onError, isLoading }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          isLoading={isLoading}
          onError={() => onError}
        />
      ))}
    </section>
  );
};
