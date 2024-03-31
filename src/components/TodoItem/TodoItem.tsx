import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
};

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;

  return (
    <div data-cy="Todo" className={'todo' + (completed ? ' completed' : '')}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => {}}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      <Loader />
    </div>
  );
};
