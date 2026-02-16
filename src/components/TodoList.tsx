import { Todo } from '../types/Todo';

interface Props {
  sortedTodoes: Todo[];
}

export const TodoList: React.FC<Props> = ({ sortedTodoes }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {sortedTodoes.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={`todo ${todo.completed ? 'completed' : ''}`}
        >
          <label
            className="todo__status-label"
            htmlFor={`todo-status-${todo.id}`}
          >
            <input
              id={`todo-status-${todo.id}`}
              aria-label="Mark todo as completed"
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              readOnly
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
      ))}
    </section>
  );
};
