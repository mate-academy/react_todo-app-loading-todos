import classNames from 'classnames';
import { Loader } from './Loader';

interface Props {
  title: string;
  completed: boolean;
}

export const TodoInfo: React.FC<Props> = ({ title, completed }) => {
  return (
    <div
      data-cy="Todo"
      className={classNames(
        'todo',
        {
          completed,
        },
      )}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">{title}</span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDeleteButton"
      >
        ×
      </button>

      <Loader />
    </div>
  );
};
