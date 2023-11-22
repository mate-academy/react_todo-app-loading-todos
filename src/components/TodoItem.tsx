import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  onUpdateTodos: (todo: Todo) => void,
};

export const TodoItem: React.FC<Props> = ({ todo, onUpdateTodos }) => {
  const {
    // id,
    // userId,
    title,
    completed,
  } = todo;

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed,
      })}
    >
      <label className="todo__status-label">
        <input
          checked={completed}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onClick={() => onUpdateTodos({ ...todo, completed: !completed })}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
      >
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
