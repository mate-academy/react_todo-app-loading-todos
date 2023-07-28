import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    <div className={cn('todo', {
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
      <button type="button" className="todo__remove">x</button>

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>

  );
};
