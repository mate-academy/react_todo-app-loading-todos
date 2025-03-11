import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  preparedTodos: Todo[] | null;
  errorMessage: string;
  loading: Set<number>;
  onRemoveTodo: (id: number) => Promise<void>;
};

export const TodoList: React.FC<Props> = ({
  preparedTodos,
  errorMessage,
  loading,
  onRemoveTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {preparedTodos?.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          loading={loading.has(todo.id)}
          onRemoveTodo={onRemoveTodo}
        />
      ))}
    </section>
  );
};
