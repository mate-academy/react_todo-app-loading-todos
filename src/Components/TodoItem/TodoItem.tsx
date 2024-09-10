/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  onSubmit: (todo: Todo) => Promise<void>;
  onDelete: (todoId: number) => Promise<void>;
};

export const TodoItem: React.FC<Props> = ({ todo, onSubmit, onDelete }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const [value, setValue] = useState(todo.title);

  const handleDelete = () => {
    setIsLoading(true);

    onDelete(todo.id)
      .then(() => setIsFormVisible(false))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateCompleted = () => {
    setIsLoading(true);

    onSubmit({ ...todo, completed: !isCompleted })
      .then(() => setIsCompleted(!isCompleted))
      .finally(() => setIsLoading(false));
  };

  const handleSubmit = () => {
    if (value.trim().length === 0) {
      handleDelete();
    } else {
      setIsLoading(true);

      onSubmit({ ...todo, title: value })
        .then(() => setIsFormVisible(false))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={isCompleted}
          onChange={handleUpdateCompleted}
        />
      </label>

      {isFormVisible ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={value}
            onChange={event => setValue(event.target.value)}
            onBlur={() => setIsFormVisible(false)}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsFormVisible(true)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      )}

      {/* Remove button appears only on hover */}

      {/* overlay will cover the todo while it is being deleted or updated */}
      {/* 'is-active' class puts this modal on top of the todo */}
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', { 'is-active': isLoading })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
