// import { ErrorCode } from '../../types/Error';
import { Todo } from '../../types/Todo';

import { Loader } from '../Loader/Loader';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  // onShowError: (code: Exclude<ErrorCode, null>) => void;
  // onClearError: () => void;
  onStatusUpdate: (id: number, completed: boolean) => void;
};

export const Main: React.FC<Props> = ({ todos, onStatusUpdate }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <div
          data-cy="Todo"
          className={cn('todo', {
            completed: todo.completed === true,
          })}
          key={todo.id}
        >
          <label className="todo__status-label" aria-label="Toggle todo status">
            <input
              id={`todo-status-${todo.id}`}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={event => onStatusUpdate(todo.id, event.target.checked)}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          {/* Remove button appears only on hover */}
          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          {/* overlay will cover the todo while it is being deleted or updated */}
          <Loader />
        </div>
      ))}
    </section>
  );
};
