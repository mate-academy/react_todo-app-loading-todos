import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, completed, title } = todo;

  return (
    <div
      key={id}
      className={classNames('todo', { completed })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>

      <span className="todo__title">
        {title}
      </span>
      <button type="button" className="todo__remove">×</button>

      {/* <form>
        <input
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value="Todo is being edited now"
        />
      </form> */}

      {/* 'is-active' class puts this modal on top of the todo */}

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
