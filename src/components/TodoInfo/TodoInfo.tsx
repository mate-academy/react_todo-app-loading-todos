import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;
  const [visibleButton, setVisibleButton] = useState(false);

  return (
    <div
      className={classNames('todo', { completed })}
      onMouseEnter={() => setVisibleButton(true)}
      onMouseLeave={() => setVisibleButton(false)}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>

      <span className="todo__title">{title}</span>

      {visibleButton && (
        <button type="button" className="todo__remove">×</button>
      )}

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
