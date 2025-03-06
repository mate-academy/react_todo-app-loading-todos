import cs from 'classnames';

interface Props {
  title: string;
  completed: boolean;
}

export const TodoItem: React.FC<Props> = ({ title, completed }) => {
  return (
    <div data-cy="Todo" className={cs('todo', { completed: completed })}>
      <label className="todo__status-label">
        {/* This comment is made because it fixes
          "A form label must be associated with a control" error */}
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

      {/* Remove button appears only on hover */}
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
