import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodoLoader } from './TodoLoader';

type Props = {
  filteredTodos: Todo[];
};

export const TodoItem: React.FC<Props> = ({ filteredTodos }) => {
  return (
    <>
      {filteredTodos.map(({ id, title, completed }) => (
        <li
          key={id}
          data-cy="Todo"
          className={classNames('todo', {
            completed,
          })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={completed}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {title}
          </span>

          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          <TodoLoader />
        </li>
      ))}
    </>
  );
};
