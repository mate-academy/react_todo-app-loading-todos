import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  loadingTodoId: number | null;
  handleToggle: (todo: Todo) => void;
  handleDelete: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  loadingTodoId,
  handleToggle,
  handleDelete,
}) => (
  <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
    {loadingTodoId === todo.id && (
      <div data-cy="TodoLoader" className="modal overlay is-active">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    )}
    <label className="todo__status-label" htmlFor={`todo-checkbox-${todo.id}`}>
      <input
        id={`todo-checkbox-${todo.id}`}
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status active"
        checked={todo.completed}
        disabled={loadingTodoId === todo.id}
        onChange={() => handleToggle(todo)}
        aria-label={`Mark todo "${todo.title}" as completed`}
      />
    </label>

    <span data-cy="TodoTitle" className="todo__title">
      {todo.title}
    </span>

    <button
      type="button"
      className="todo__remove"
      data-cy="TodoDelete"
      aria-label={`Delete todo: ${todo.title}`}
      onClick={() => handleDelete(todo.id)}
    >
      ×
    </button>
  </div>
);
