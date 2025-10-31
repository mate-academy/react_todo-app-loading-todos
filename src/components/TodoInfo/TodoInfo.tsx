/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  todo: Partial<Todo>;
  inLoading: boolean;
  handleChange: (todoId: number, changed: Partial<Todo>) => Promise<void>;
  handleDelete: (todoIds: number) => Promise<void>;
}

export const TodoInfo: React.FC<Props> = ({
  todo,
  inLoading = false,
  handleChange,
  handleDelete,
}) => {
  const [title, setTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputPlace = useRef<HTMLInputElement>(null);

  const handleTitleChange = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (todo.id) {
      setIsEditing(true);
    }
  };

  const handleChangeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title && todo.id) {
      handleDelete(todo.id);
    }

    if (title && todo.title !== title && todo.id) {
      handleChange(todo.id, { title: title })
        .then(() => {
          setIsEditing(false);
        })
        .catch(() => {
          if (inputPlace.current) {
            inputPlace.current.focus();
          }
        });
    }
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onClick={() =>
            handleChange(todo.id as number, { completed: !todo.completed })
          }
          checked={todo.completed}
        />
      </label>

      {isEditing ? (
        <form
          onSubmit={event => handleChangeSubmit(event)}
          onBlur={event => handleChangeSubmit(event)}
        >
          <input
            ref={inputPlace}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </form>
      ) : (
        <React.Fragment>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={event => handleTitleChange(event)}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete(todo.id as number)}
          >
            ×
          </button>
        </React.Fragment>
      )}

      <div
        data-cy="TodoLoader"
        className={cn('modal', 'overlay', { 'is-active': inLoading })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
