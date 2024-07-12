/* eslint-disable jsx-a11y/label-has-associated-control */
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => (
  <div data-cy="Todo" className={`todo ${todo.completed && 'completed'}`}>
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
    <button type="button" className="todo__remove" data-cy="TodoDelete">
      x
    </button>

    <div data-cy="TodoLoader" className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
);
