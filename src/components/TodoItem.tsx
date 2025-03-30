/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type TodoItemProps = {
  todo: Todo;
  handleUpdateTodo: (id: number) => void;
  handleDeleteTodo: (id: number) => void;
  isLoading: boolean;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  handleUpdateTodo,
  handleDeleteTodo,
  isLoading,
}) => {
  return (
    <div
      data-cy="Todo"
      key={todo.id}
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => {
            handleUpdateTodo(todo.id);
          }}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => {
          handleDeleteTodo(todo.id);
        }}
        disabled={isLoading}
      >
        ×
      </button>

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': isLoading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
