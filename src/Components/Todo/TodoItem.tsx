import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type TodoItemProps = {
  todo: Todo;
  onDelete: (id: number) => void;
  isLoading: boolean;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  isLoading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const { id, completed, title } = todo;

  const handleTriggerEdit = () => {
    setIsEditing(prevState => !prevState);
  };

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const modalStyles = classNames('modal', 'overlay', {
    'is-active': isLoading,
  });

  return (
    <div data-cy="Todo" className={classNames('todo', { completed })}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label" htmlFor={`todoStatus-${id}`}>
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          id={`todoStatus-${id}`}
          checked={completed}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSave} id={`todoStatus-${id}`}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editTitle}
            onChange={handleEdit}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleTriggerEdit}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDelete(id)}
          >
            ×
          </button>
        </>
      )}

      <div data-cy="TodoLoader" className={modalStyles}>
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
