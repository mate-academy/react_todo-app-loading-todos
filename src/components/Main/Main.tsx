import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  posts: Todo[];
};

export const Main: React.FC<Props> = ({ posts }) => {
  return (
    <>
      <section className="todoapp__main" data-cy="TodoList">

        {posts.map((todo: Todo) => {
          const { completed, title, id } = todo;

          return (
            <div
              key={id}
              data-cy="Todo"
              className={classNames({
                todo: !completed,
                'todo completed': completed,
              })}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={completed}
                  onChange={() => { }}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {title}
              </span>

              {/* Remove button appears only on hover */}
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              {/* overlay will cover the todo while it is being updated */}
              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};
