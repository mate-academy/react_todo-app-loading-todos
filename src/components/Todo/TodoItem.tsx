import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  key: number;
};

export const TodoItem = ({ todo, key }: Props) => {
  return (
    <div key={key}>
      <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`} key={todo.id}>
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          {todo.title}
        </span>
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
        >
          ×
        </button>

        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    </div>
  );
};
