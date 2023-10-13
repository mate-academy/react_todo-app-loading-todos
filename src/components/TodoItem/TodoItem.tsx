import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({
  todo,
}) => {
  const {
    title,
    completed,
  } = todo;

  return (
    <div
      className={classNames('todo', { completed })}
      data-cy="Todo"
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          data-cy="TodoStatus"
        />
      </label>

      <span className="todo__title" data-cy="TodoTitle">
        {title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
      >
        ×
      </button>

      <div className="modal overlay" data-cy="TodoLoader">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
