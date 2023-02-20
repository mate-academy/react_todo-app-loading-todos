import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo,
}

export const TodoInfo:React.FC<Props> = ({ todo }) => (
  <div
    className={cn('todo', {
      completed: todo.completed,
    })}
  >
    <label className="todo__status-label">
      <input
        type="checkbox"
        className="todo__status"
        // defaultChecked={completed}
      />
    </label>

    <span className="todo__title">{todo.title}</span>

    <button type="button" className="todo__remove">×</button>

    <div className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
);
