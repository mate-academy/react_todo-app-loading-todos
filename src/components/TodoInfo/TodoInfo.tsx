import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({
  todo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const { title, completed } = todo;

  return (
    <div className={classNames('todo', {
      completed,
    })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>

      {isEditing ? (
        <form>
          <input
            type="text"
            className="todo__title-field"
            placeholder={title}
            value={newTodoTitle}
            onChange={(event) => setNewTodoTitle(event.target.value)}
          />
        </form>
      ) : (
        <>
          <span
            className="todo__title"
            onDoubleClick={() => setIsEditing(!isEditing)}
          >
            {title}
          </span>
          <button type="button" className="todo__remove">×</button>
        </>

      )}

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
