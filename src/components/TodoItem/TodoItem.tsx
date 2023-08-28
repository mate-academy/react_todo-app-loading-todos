import { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const [checked, setChecked] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleChecked = () => {
    setChecked(currentChecked => !currentChecked);
  };

  return (
    <li
      className={classNames('todo', { completed, editing: isEditing })}
      key={id}
    >
      <label
        className="todo__status-label"
        onDoubleClick={handleEditing}
        htmlFor={`toggle-view-${id}`}
      >
        <input
          type="checkbox"
          className="todo__status"
          id={`toggle-view-${id}`}
          checked={checked}
          onClick={handleChecked}
        />
      </label>

      <span className="todo__title">{title}</span>

      <button
        type="button"
        className="todo__remove"
        aria-label="Delete Todo"
      >
        x
      </button>
    </li>
  );
};
