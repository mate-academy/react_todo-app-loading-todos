import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  loadingId: string | null;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  loading,
  loadingId,
  onToggle,
  onDelete,
}) => {
  const isEmpty = todos.length === 0;

  return (
    <section
      className={`todoapp__main ${isEmpty ? 'hidden' : ''} ${loading ? 'is-loading' : ''}`}
      data-cy="TodoList"
    >
      {loading && (
        <div className="global-loader" style={{ padding: '1rem' }}>
          Loading...
        </div>
      )}

      {!loading &&
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            loading={loadingId === String(todo.id)}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
    </section>
  );
};
