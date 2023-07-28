import classNames from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo,
}

export const TodoItems: React.FC<Props> = ({
  todo,
}) => {
  return (
    <div
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          checked={todo.completed}
          type="checkbox"
          className="todo__status"
        />
      </label>

      <span className="todo__title">{todo.title}</span>
      <button type="button" className="todo__remove">×</button>

      {/* <div className="modal overlay is-active">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div> */}
    </div>
  );
};
