/* eslint-disable jsx-a11y/label-has-associated-control */
import { TodoLoader } from '../TodoLoader/TodoLoader';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  isEditing?: boolean;
  isLoading?: boolean;
};

export const TodoItem: React.FC<Props> = ({
  todo: { title, completed },
  isEditing,
  isLoading,
}) => {
  return (
    <div data-cy="Todo" className={`todo ${completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>

      {isEditing ? (
        <form>
          <input
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {title}
          </span>
          <button data-cy="TodoDelete" type="button" className="todo__remove">
            ×
          </button>
        </>
      )}

      <TodoLoader isActive={isLoading} />
    </div>
  );
};
