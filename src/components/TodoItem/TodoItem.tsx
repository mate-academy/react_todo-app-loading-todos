import React, { useState, useRef } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(title);
  const inputEditRef = useRef<HTMLInputElement | null>(null);

  const handeleClickOnTitle = () => {
    setIsEditable(true);

    setTimeout(() => {
      inputEditRef.current?.focus();
    }, 0);
  };

  return (
    <>
      {/* This todo is not completed / completed */}
      <div
        data-cy="Todo"
        className={cn('todo', { completed })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        {/* This form is shown instead of the title and remove button */}
        {isEditable ? (
          <form>
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={value}
              onChange={e => setValue(e.target.value)}
              onBlur={() => setIsEditable(false)}
              ref={inputEditRef}
            />
          </form>
        ) : (
          /* Remove button appears only on hover */
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={handeleClickOnTitle}
            >
              {title}
            </span>
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>
          </>
        )}
        {/* 'is-active' class puts this modal on top of the todo */}
        {/* This todo is in loadind state */}
        {/* modal overlay is-active */}

        {/* overlay will cover the todo while it is being updated */}
        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    </>
  );
};
