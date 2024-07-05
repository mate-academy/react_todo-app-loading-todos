/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';

interface ToDoItemProps {
  id: number;
  title: string;
  completed: boolean;
}
const ToDoItem: React.FC<ToDoItemProps> = ({ id, title, completed }) => (
  <div
    key={id}
    data-cy="Todo"
    className={classNames('todo', { completed: completed })}
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
    <div data-cy="TodoLoader" className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
);

export default ToDoItem;
