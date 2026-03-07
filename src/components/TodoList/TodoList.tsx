/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  loadTodos: boolean;
};

export const TodoList: React.FC<Props> = ({ todos, loadTodos }) => {
  return (
    <>
      <section
        className={cn('todoapp__main', todos?.length === 0 ? 'hidden' : '')}
        data-cy="TodoList"
      >
        {todos?.map(todo => (
          <div
            data-cy="Todo"
            className={cn('todo', todo.completed ? 'completed' : '')}
            key={todo.id}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
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
              disabled={loadTodos}
            >
              ×
            </button>

            {/* overlay will cover the todo while it is being deleted or updated */}
            <div
              data-cy="TodoLoader"
              className={cn('modal overlay', loadTodos ? '' : 'hidden')}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
