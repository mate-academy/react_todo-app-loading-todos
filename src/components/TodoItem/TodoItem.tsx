import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  onToggle: (todoId: number) => void;
}

const TodoItem = ({ todo: { id, title, completed }, onToggle }: Props) => {
  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label aria-label="Todo Status" className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => onToggle(id)}
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
};

export default TodoItem;
