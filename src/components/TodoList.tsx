import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  visibleTodos: Todo[];
  handleDelete: (id: number) => void;
  handleToggle: (todo: Todo) => void;
  loadingTodoCheck: number | null;
};

/* eslint-disable jsx-a11y/label-has-associated-control */
export const Todolist: React.FC<Props> = ({
  visibleTodos,
  handleDelete,
  handleToggle,
  loadingTodoCheck,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {visibleTodos.map(todo => (
        <div
          data-cy="Todo"
          className={`todo ${todo.completed ? 'completed' : ''}`}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => handleToggle(todo)}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete(todo.id)}
          >
            ×
          </button>

          {/* overlay will cover the todo while it is being deleted or updated */}
          <div
            data-cy="TodoLoader"
            className={`modal overlay ${loadingTodoCheck === todo.id ? 'is-active' : ''}`}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
