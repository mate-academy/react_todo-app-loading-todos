import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  preparedTodos: Todo[] | null;
  errorMessage: string;
};

export const TodoList: React.FC<Props> = ({ preparedTodos, errorMessage }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {preparedTodos?.map(todo => (
        <TodoItem key={todo.id} todo={todo} errorMessage={errorMessage} />
      ))}
    </section>
  );
};
