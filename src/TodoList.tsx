import React from 'react';
import { Todo } from './types/Todo';

interface Props {
  filteredTodos: Todo[];
  loadingTodo: boolean;
  setError: (error: string | null) => void;
}

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  loadingTodo,
  setError,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {loadingTodo ? (
        <p>Loading...</p>
      ) : (
        filteredTodos.map(todo => (
          <div
            key={todo.id}
            className={`todo ${todo.completed ? 'completed' : ''}`}
            data-cy="Todo"
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => setError(null)}
            >
              ×
            </button>
          </div>
        ))
      )}
    </section>
  );
};
