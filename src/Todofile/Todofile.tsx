import { Todo } from '../types/Todo';
import cn from 'classnames';

interface Props {
  todo: Todo | null;
  onSelect: (todo: number) => void;
  updated: (todo: Todo) => void;
}

export const Todofile: React.FC<Props> = ({
  todo = null,
  onSelect,
/* eslint-disable */
  updated,
}) => {
  return (
    <>
      {todo !== null && (
        <div
          data-cy="Todo"
          className={cn(todo.completed ? 'todo completed' : 'todo')}
        >
          <label
            className="todo__status-label"
            onClick={() => {
              updated({
                ...todo,
                completed: !todo.completed,
              });
            }}
          >
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
            onClick={() => onSelect(todo.id)}
          >
            ×
          </button>

          {/* overlay will cover the todo while it is being deleted or updated */}
          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )}
    </>
  );
};
