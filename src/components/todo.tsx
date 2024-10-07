import React from 'react';
import classNames from 'classnames';
// import { Loader } from './todoLoader';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  loading: boolean;
  errorMessage: string;
  // isSubmitting: boolean;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  loading,
  errorMessage,
  // isSubmitting,
}) => {
  return (
    <>
      {!loading && !errorMessage && (
        <div
          data-cy="Todo"
          className={classNames('todo', {
            completed: todo.completed,
          })}
        >
          {/*eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              value={todo.id}
              checked={todo.completed}
            />
          </label>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            // disabled={isSubmitting}
          >
            ×
          </button>

          {/* {spinnerLoading && <Loader spinnerLoading={spinnerLoading} />} */}
        </div>
      )}
    </>
  );
};
