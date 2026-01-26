/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type TodoItemState = 'view' | 'editing' | 'saving';

interface TodoItemProps {
  todo: Todo;
  // onUpdate: (id: number, title: string) => Promise<void>;
  // onDelete: (id: number) => Promise<void>;
  // onToggle: (id: number) => Promise<void>;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [state, setState] = useState<TodoItemState>('view');
  const [editingTitle, setEditingTitle] = useState(todo.title);

  const isLoading = state === 'saving';
  const isEditing = state === 'editing';

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          // onChange={handleToggle}
          // disabled={isLoading}
        />
      </label>

      {!isEditing ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setState('editing')}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            // onClick={handleDelete}
            // disabled={isLoading}
          >
            ×
          </button>
        </>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault();
            // handleSave();
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editingTitle}
            onChange={e => setEditingTitle(e.target.value)}
            // onBlur={handleSave}
            // onKeyDown={e => e.key === 'Escape' && handleCancel()}
            autoFocus
            disabled={isLoading}
          />
        </form>
      )}

      <div
        data-cy="TodoLoader"
        className={`modal overlay ${isLoading ? 'is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
