import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  preparedTodos: Todo[] | null;
  errorMessage: string;
};

export const TodoList: React.FC<Props> = ({
  preparedTodos,

  errorMessage,
}) => {
  return (
    <>
      {preparedTodos?.map(todo => (
        <section key={todo.id} className="todoapp__main" data-cy="TodoList">
          <TodoItem key={todo.id} todo={todo} errorMessage={errorMessage} />
        </section>
      ))}
    </>
  );
};
