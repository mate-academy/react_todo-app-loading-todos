/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { Todo } from '../types/Todo';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  deletingIds: number[];
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  loading,
  deletingIds,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={`todo ${todo.completed ? 'completed' : ''}`}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              disabled={loading}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <div
            data-cy="TodoLoader"
            className={`modal overlay ${deletingIds.includes(todo.id) ? 'is-active' : ''}`}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            disabled={loading}
          >
            ×
          </button>
        </div>
      ))}
    </section>
  );
};
