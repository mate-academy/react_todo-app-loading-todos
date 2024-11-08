import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  visibleTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ visibleTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => {
        const { id, completed, title } = todo;

        return (
          <div
            data-cy="Todo"
            className={classNames('todo', { completed: todo.completed })}
            key={id}
          >
            <label className="todo__status-label">
              {completed ? (
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked
                />
              ) : (
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                />
              )}
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {title}
            </span>

            {/* Remove button appears only on hover */}
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              x
            </button>

            {/* overlay will cover the todo while it is being deleted or updated */}
            <div data-cy="TodoLoader" className="modal overlay">
              <div
                className={classNames(
                  'modal-background',
                  'has-background-white-ter',
                )}
              />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </section>
  );
};
