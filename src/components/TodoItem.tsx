import React from 'react';
import { Todo } from '../types/Todo';

/* eslint-disable jsx-a11y/label-has-associated-control */
type Props = {
  todo: Todo;
  deletingIds: number[];
  toggleTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  editingTodo: Todo | null;
  newTitle: string;
  setNewTitle: (v: string) => void;
  updateTitle: (e: React.FormEvent) => void;
  handleKeyUp: (e: React.KeyboardEvent) => void;
  handleEditClick: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  deletingIds,
  toggleTodo,
  deleteTodo,
  editingTodo,
  newTitle,
  setNewTitle,
  updateTitle,
  handleKeyUp,
  handleEditClick,
}) => {
  const isEditing = editingTodo?.id === todo.id;

  return (
    <div
      data-cy="Todo"
      className={`todo ${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo)}
        />
      </label>

      {isEditing ? (
        <form onSubmit={updateTitle}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            autoFocus
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onBlur={updateTitle}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => handleEditClick(todo)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={`modal overlay ${deletingIds.includes(todo.id) ? 'is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
