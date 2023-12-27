/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  ChangeEvent, KeyboardEvent,
  useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../libs/types';
import { KeysEvent } from '../../libs/enums';

type Props = {
  item: Todo;
  onDelete: (todoId: number) => void;
  onUpdate: (editedTodo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({ item, onDelete, onUpdate }) => {
  const { id, title, completed } = item;
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(title);

  const editingInputRef = useRef<HTMLInputElement | null>(null);

  const handleDelete = () => {
    onDelete(id);
  };

  const handleCompletedToggle = () => {
    onUpdate({ ...item, completed: !completed });
  };

  const handleShowEditInput = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (isEditing && editingInputRef.current) {
      editingInputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditingTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setEditingTitle(event.target.value);
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingTitle(title);
  };

  const saveEditing = () => {
    setIsEditing(false);

    if (!editingTitle.trim()) {
      onDelete(id);

      return;
    }

    onUpdate({ ...item, title: editingTitle });
  };

  const handleEditInputLoseFocus = () => {
    saveEditing();
  };

  const handleSaveEditedTitle = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KeysEvent.escape) {
      resetEditing();
    }

    if (event.key === KeysEvent.enter) {
      saveEditing();
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleCompletedToggle}
        />
      </label>

      {isEditing ? (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            ref={editingInputRef}
            value={editingTitle}
            onChange={handleEditingTitle}
            onBlur={handleEditInputLoseFocus}
            onKeyUp={handleSaveEditedTitle}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleShowEditInput}
          >
            { title }
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

      { false && (
        <div data-cy="TodoLoader" className="modal overlay is-active">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )}
    </div>
  );
};
