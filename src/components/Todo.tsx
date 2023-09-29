/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Todo } from '../types/Todo';

interface TodoProps {
  todo: Todo;
  isEditing: boolean;
  toggleEditing: () => void;
}

export const TodoItem:
React.FC<TodoProps> = ({ todo, isEditing, toggleEditing }) => {
  const handleToggleEditing = () => {
    toggleEditing();
  };

  return (
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
        />
      </label>
      {isEditing ? (
        <input
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value={todo.title}
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onClick={handleToggleEditing}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleToggleEditing();
            }
          }}
        >
          {todo.title}
        </span>
      )}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
      >
        ×
      </button>
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
