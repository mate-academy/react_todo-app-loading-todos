import cn from 'classnames';
import type { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  isLoading: boolean;
};

export const TodoList: React.FC<Props> = ({ todos, isLoading }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {isLoading && <div className="loader is-overlay" data-cy="TodoLoader" />}

    {todos.map(todo => (
      <div
        key={todo.id}
        data-cy="Todo"
        className={cn('todo', { completed: todo.completed })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            readOnly
            aria-label={`Toggle status: ${todo.title}`}
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          {todo.title}
        </span>

        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          disabled
          aria-label="delete disabled in Part 1"
        />

        <div data-cy="TodoLoader" className={cn('modal overlay', 'hidden')}>
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    ))}
  </section>
);
