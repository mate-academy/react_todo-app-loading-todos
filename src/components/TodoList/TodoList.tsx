import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';

import { Loader } from '../Loader/Loader';

import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

type Props = {
  todos: Todo[];
  status: Status;
};

export const TodoList: React.FC<Props> = ({ todos, status }) => {
  const getVisibleTodos = useCallback((): Todo[] => {
    return todos.filter(todo => {
      switch (status) {
        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;

        case Status.All:
        default:
          return todos;
      }
    });
  }, [todos, status]);

  const visibleTodos = useMemo(
    getVisibleTodos,
    [todos, status],
  );

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map((todo) => {
        const {
          id,
          title,
          completed,
        } = todo;

        return (
          <div
            data-cy="Todo"
            key={id}
            className={classNames(
              'todo',
              { completed },
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

            <Loader />
          </div>
        );
      })}
    </section>
  );
};
