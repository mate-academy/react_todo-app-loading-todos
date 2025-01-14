import classNames from 'classnames';
import { Todo } from '../types/Todo';
interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    <div
      data-cy="Todo"
      className={classNames(todo.completed ? 'todo completed' : 'todo')}
      key={todo.id}
    >
      <label className="todo__status-label" htmlFor={`todo-status-${todo.id}`}>
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          id={`todo-status-${todo.id}`} // Додаємо унікальний id
          checked={todo.completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
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
