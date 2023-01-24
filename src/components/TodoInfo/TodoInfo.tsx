import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const [title, setTitle] = useState(todo.title);
  const [isChecked, setIsChecked] = useState(todo.completed);
  const [isEditing, setIsEditing] = useState(false);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleField.current?.focus();
  }, [isEditing]);

  // update todo.completed
  const onCheck = () => {
    setIsChecked(!isChecked);
  };

  // update todo.title
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsEditing(false);
  };

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: isChecked,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          checked={isChecked}
          onChange={onCheck}
          type="checkbox"
          className="todo__status"
        />
      </label>

      {isEditing
        ? (
          <form
            onSubmit={onSubmit}
            onBlur={() => setIsEditing(false)}
          >
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={title}
              ref={titleField}
              onChange={(event) => setTitle(event.target.value)}
            />
          </form>
        )
        : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => setIsEditing(true)}
            >
              {todo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
            >
              ×
            </button>
          </>
        )}

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': false,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
