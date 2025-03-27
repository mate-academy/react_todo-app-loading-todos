import { Todo } from '../types/Todo';
import { Loader } from './Loader';

type Props = {
  todo: Todo;
  load: boolean;
};

export const TodoInfo: React.FC<Props> = ({ todo, load }) => {
  return (
    <div data-cy="Todo" className={`todo${todo.completed ? ' completed' : ''}`}>
      <label className="todo__status-label" htmlFor="todoStatus">
        <input
          id="todoStatus"
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
        {}
      </label>
      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>
      {/* Remove button appears only on hover */}
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>
      {/* overlay will cover the todo while it is being deleted or updated */}
      <Loader load={load} />
    </div>
  );
};
