import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const { title, completed } = todo;

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  return (
    <div className={classNames('todo', { completed })}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked
        />
      </label>

      {isEditing ? (
        <form>
          <input
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editedTitle}
            onChange={handleInputTitle}
            onBlur={handleCancelEdit}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {title}
          </span>
          <button type="button" className="todo__remove">×</button>
        </>
      )}

      <div className={classNames('modal overlay', { 'is-active': isLoading })}>
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
