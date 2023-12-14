import { Todo } from '../../types/Todo';
import { Loader } from './loader';

type Props = {
  todo: Todo;
};

export const Todos: React.FC<Props> = ({
  todo,
}) => (
  <div
    key={todo.id}
    data-cy="Todo"
    className={todo.completed
      ? 'todo completed'
      : 'todo'}
  >
    <label className="todo__status-label">
      <input
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        checked={todo.completed}
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

    <Loader />
  </div>
);
