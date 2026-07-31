/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  todos: Todo[] | null;
  isLoading: boolean;
};

export const TodoApp: React.FC<Props> = ({ todos, isLoading }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* <Loader isLoading={isLoading} /> */}
      {/* This is a completed todo */}
      {todos &&
        todos.map(el => {
          return (
            <div
              data-cy="Todo"
              className={`todo ${el.completed ? 'completed' : ''}`}
              key={el.id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className={`todo__status ${el.completed ? 'completed' : ''}`}
                  checked={el.completed}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {el.title}
              </span>

              {/* Remove button appears only on hover */}
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              {/* overlay will cover the todo while it is being deleted or updated */}
              <Loader isLoading={isLoading} />
            </div>
          );
        })}
    </section>
  );
};
