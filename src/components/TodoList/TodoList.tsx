import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import '../../styles/index.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.length > 0 && (
        todos.map((todo: Todo) => {
          return (
            <div
              data-cy="Todo"
              className={classNames(
                'todo',
                { completed: todo.completed },
              )}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                />
              </label>

              <span
                data-cy="TodoTitle"
                className="todo__title"
              >
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDeleteButton"
              >
                ×
              </button>

              <div
                data-cy="TodoLoader"
                className={classNames(
                  'modal',
                  'overlay',
                )}
              >
                <div
                  className="modal-background has-background-white-ter"
                />
                <div className="loader" />
              </div>
            </div>
          );
        })
      )}
    </section>
  );
};
