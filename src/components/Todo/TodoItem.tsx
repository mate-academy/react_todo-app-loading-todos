/* eslint-disable no-console */

import React, { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;

  const [isChecked, setIsChecked] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleSetCompleted = () => {
    setIsChecked(!isChecked);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.currentTarget.checked);
    handleSetCompleted();
  };

  const handleDeleteClick = () => {
    console.dir(1);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleBlur = () => {
    if (editedTitle.trim() === '') {
      console.dir(1);
    } else {
      console.dir(1);
    }

    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleBlur();
    } else if (event.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(title);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={cn(
        'todo',
        {
          completed: isChecked,
        },
      )}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </label>

      {!isEditing && (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDeleteClick}
          >
            ×
          </button>
        </>
      )}

      {isEditing && (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            value={editedTitle}
            onChange={handleTitleChange}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
        </form>
      )}

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
