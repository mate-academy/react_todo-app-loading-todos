import classNames from 'classnames';

type Props = {
  title: string,
  completed: boolean;
};

export const TodoInfo: React.FC<Props> = ({
  title,
  completed,
}) => {
  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { 'todo completed': completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">{title}</span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDeleteButton"
      >
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
