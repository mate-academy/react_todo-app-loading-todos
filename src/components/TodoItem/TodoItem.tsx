import { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo
};

export const TodoItem:React.FC<Props> = ({ todo }) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div
      key={todo.id}
      className={classNames('todo', {
        completed: todo.completed,
      })}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
      </label>

      <span className="todo__title">{todo.title}</span>
      {isHover && (
        <button type="button" className="todo__remove">×</button>
      )}

      {/* This form is shown instead of the title and remove button */}
      {/* <form>
        <input
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value="Todo is being edited now"
        />
      </form> */}

      <div className={classNames('modal overlay', {
        'is-active': !todo.completed,
      })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
