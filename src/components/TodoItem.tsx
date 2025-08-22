/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  isEditing: number | null;
  setIsEditing: (value: number | null) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  isEditing,
  setIsEditing,
}) => {
  return (
    <div
      key={todo.id}
      data-cy="Todo"
      className={cn('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
      </label>
      {!isEditing ? (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setIsEditing(todo.id)}
        >
          {todo.title}
        </span>
      ) : isEditing === todo.id ? (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value="Todo is being edited now"
          />
        </form>
      ) : (
        ''
      )}

      {/* Remove button appears only on hover */}
      {isEditing === todo.id || (
        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>
      )}

      <div data-cy="TodoLoader" className="modal overlay">
        <div
          className={cn('modal-background has-background-white-ter is-active')}
        />
        <div className="loader" />
      </div>
    </div>
  );
};
