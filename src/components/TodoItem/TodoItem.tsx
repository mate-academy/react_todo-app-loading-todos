import { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    title,
    completed,
  } = todo;

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      className={cn(
        'todo',
        { completed },
      )}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
        />
      </label>
      {!isEditing
        ? (
          <>
            <span
              className="todo__title"
              onDoubleClick={() => setIsEditing(true)}
            >
              {title}
            </span>
            <button type="button" className="todo__remove">×</button>
          </>
        )
        : (
          <form>
            <input
              type="text"
              className="todo__title-field"
              value={title}
              onBlur={() => setIsEditing(false)}
            />
          </form>
        )}

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
