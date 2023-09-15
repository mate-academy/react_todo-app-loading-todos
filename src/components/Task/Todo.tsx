import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const Task = ({ todo }: Props) => (
  <div
    className={todo.completed ? 'todo completed' : 'todo'}
  >
    <label className="todo__status-label">
      <input
        type="checkbox"
        className="todo__status"
      />
    </label>

    <span className="todo__title">{todo.title}</span>

    {/* Remove button appears only on hover */}
    <button
      type="button"
      className="todo__remove"
    >
      ×

    </button>

    {/* overlay will cover the todo while it is being updated */}
    <div className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
);
