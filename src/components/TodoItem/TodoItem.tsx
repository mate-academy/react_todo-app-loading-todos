import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => (
  <div
    className={cn('todo', {
      completed: todo.completed,
    })}
    key={todo.id}
  >
    <label className="todo__status-label">
      <input
        type="checkbox"
        className="todo__status"
        checked={todo.completed}
      />
    </label>

    <span className="todo__title">{todo.title}</span>

    <button type="button" className="todo__remove">
      ×
    </button>

    <div className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
);
