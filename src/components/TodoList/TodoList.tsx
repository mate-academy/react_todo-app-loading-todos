import React from 'react';

import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  status: string,
};

export const TodoList: React.FC<Props> = ({ todos, status }) => {
  const filteredTodos = todos.filter(todo => {
    switch (status) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      case 'all':
      default:
        return todos;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => {
        const {
          id,
          title,
          completed,
        } = todo;

        return (
          <div
            data-cy="Todo"
            className={classNames(
              'todo',
              { completed },
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
