import { FC } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo,
  handleDelete: () => void;
  handleUpdate: () => void;
}

export const TodoElement: FC<Props> = ({
  todo,
  handleDelete,
  handleUpdate,
}) => {
  const {
    title, completed,
  } = todo;

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
          onClick={handleUpdate}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        { title }
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDeleteButton"
        onClick={handleDelete}
      >
        ×
      </button>
    </div>
  );
};
