import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title } = todo;

  return (
    <>
      <label className="todo__status-label">
        <input type="checkbox" className="todo__status" />
      </label>

      {/* <form>
        <input
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value="Todo is being edited now"
        />
      </form> */}

      <span className="todo__title">{title}</span>
      <button type="button" className="todo__remove">
        ×
      </button>

      <div className={classNames('modal overlay', {
        'is-active': !todo.completed,
      })}
      >
        <div className="modal-background has-background-white-ter" />
        {/* <div className="loader" /> */}
      </div>
    </>
  );
};
