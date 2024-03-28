import React, { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onToggle: () => void;
};

export const TodoItem: React.FC<Props> = ({ todo, onToggle }) => {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.preventDefault();
      setEditedTitle(todo.title);
      setEditing(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={`todo ${cn({
        completed: todo.completed,
      })}`}
      key={todo.id}
      onDoubleClick={handleDoubleClick}
    >
      {editing ? (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            value={editedTitle}
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <>
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={onToggle}
              aria-label="Todo status"
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </>
      )}
    </div>
  );
};
