import { Todo } from '../types/Todo';

type SingleTodoProps = {
  todo: Todo;
};

export const SingleTodo = ({ todo }: SingleTodoProps) => (
  <div
    className={todo.completed ? 'todo completed' : 'todo'}
    data-cy="Todo"
  >
    <label className="todo__status-label">
      <input
        type="checkbox"
        className="todo__status"
        checked={todo.completed}
        data-cy="TodoStatus"
      />
    </label>
    <span className="todo__title">{todo.title}</span>
    <button
      type="button"
      data-cy="TodoDelete"
      className="todo__remove"
    >
      ×
    </button>
    <div data-cy="TodoLoader" className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
);
