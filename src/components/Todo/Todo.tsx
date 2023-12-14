import cn from 'classnames';
import { Todo as TodoType } from '../../types/Todo';

interface Props {
  todo: TodoType,
}

export const Todo: React.FC<Props> = (props) => {
  const { todo } = props;

  return (
    <div
      data-cy="Todo"
      className={cn('todo',
        {
          'todo completed': todo.completed,
        })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
      >
        ×
      </button>
    </div>
  );
};
