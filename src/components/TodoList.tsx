import { Todo } from '../types/Todo';

const TodoItem: React.FC<{
  todo: Todo;
  busy?: boolean;
  onToggle: (id: Todo['id'], completed: boolean) => Promise<void>;
  onDelete: (id: Todo['id']) => Promise<void>;
}> = ({ todo, busy, onToggle, onDelete }) => {
  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label htmlFor={`todo-${todo.id}`} className="todo__status-label">
        <input
          id={`todo-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={e => void onToggle(todo.id, e.target.checked)}
          disabled={busy}
        />
        <span className="visually-hidden">Toggle todo</span>{' '}
        {/* для accessibility */}
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => void onDelete(todo.id)}
        disabled={busy}
      >
        ×
      </button>

      <div
        data-cy="TodoLoader"
        className={`modal overlay ${busy ? 'is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};

export const TodoList: React.FC<{
  todos: Todo[];
  loading: boolean;
  busyIds: Record<string, boolean>;
  onToggle: (id: Todo['id'], completed: boolean) => Promise<void>;
  onDelete: (id: Todo['id']) => Promise<void>;
}> = ({ todos, loading, busyIds, onToggle, onDelete }) => {
  if (loading) {
    return (
      <section className="todoapp__main" data-cy="TodoList">
        <div className="todoapp__loading">Loading...</div>
      </section>
    );
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.length === 0 ? (
        <div className="todoapp__empty">No todos</div>
      ) : (
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            busy={!!busyIds[String(todo.id)]}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </section>
  );
};
