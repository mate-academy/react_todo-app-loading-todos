/* eslint-disable jsx-a11y/label-has-associated-control */

import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import React, { useState } from 'react';
import { updateTodo } from '../../api/todos';

type Props = {
  todo: Todo;
  toggleTodo: (id: number) => void;
  onUpdate: (todo: Todo) => void;
  setErrorMessage: (message: string | null) => void;
  handleRemoveButton: (id: number) => void;
  setLoadingId: (id: number | null) => void;
  loadingId: number | null;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  toggleTodo,
  onUpdate,
  setErrorMessage,
  handleRemoveButton,
  setLoadingId,
  loadingId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(todo.title);

  const handleDoubleClick = () => setIsEditing(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newValue.trim()) {
      setErrorMessage('Title should not be empty');

      return;
    }

    try {
      setLoadingId(todo.id);
      const updatedTodo = await updateTodo(todo.id, {
        title: newValue,
      });

      onUpdate(updatedTodo);
      setIsEditing(false);
    } catch (error) {
      setErrorMessage('Unable to update a todo');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div
      key={todo.id}
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          disabled={loadingId === todo.id}
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      {!isEditing ? (
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
            onClick={() => handleRemoveButton(todo.id)}
          >
            ×
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewValue(e.target.value)
            }
          />
        </form>
      )}

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': loadingId == todo.id,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
