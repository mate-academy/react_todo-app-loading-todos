import { Todo } from '../types/typedefs';
import classNames from 'classnames';

interface TodoCardProps {
  todo: Todo;
  loadingTodoId: number | null;
}

export const TodoCard: React.FC<TodoCardProps> = ({ todo, loadingTodoId }) => {
  const isLoadingThisTodo = loadingTodoId === todo.id;
  const isTemp = todo.id === 0;

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          aria-label="todostatus-label"
          disabled={isLoadingThisTodo || isTemp}
        />
      </label>
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': isTemp || isLoadingThisTodo,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>
    </div>
  );
};
