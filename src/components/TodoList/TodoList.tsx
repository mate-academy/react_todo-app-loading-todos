import classNames from 'classnames';
import React from 'react';
import { Loader } from '../Loader/Loader';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {
        todos.map(({ title, id, completed }) => {
          return (
            <div
              data-cy="Todo"
              className={classNames(
                'todo',
                {
                  completed: completed === true,
                },
              )}
              key={id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  defaultChecked
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">{title}</span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDeleteButton"
              >
                ×
              </button>
              <Loader />
            </div>
          );
        })
      }
    </section>
  );
};
