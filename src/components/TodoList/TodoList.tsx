import classnames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader/Loader';

type Props = {
  todos: Todo[],
  isLoading: boolean
};

export const TodoList: React.FC<Props> = ({ todos, isLoading }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">

      {todos.map(({ title, id, completed }) => {
        return (
          <div
            key={id}
            data-cy="Todo"
            className={classnames(
              'todo',
              {
                completed: completed === true,
              },
            )}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                defaultChecked
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {title}
            </span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
            >
              ×
            </button>

            {!isLoading && (
              <Loader />
            )}

          </div>
        );
      })}
    </section>
  );
};
