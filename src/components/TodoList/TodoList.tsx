import { FC } from 'react';
import classNames from 'classnames';

import { Todo } from '../../types';

interface Props {
  visibleTodos: Todo[]
}

export const TodoList: FC<Props> = ({ visibleTodos }) => {
  return (
    <section className="todoapp__main">
      {visibleTodos.map(todo => {
        const { title, id, completed } = todo;

        return (
          <div
            className={classNames('todo', { completed })}
            key={id}
          >
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                // checked
              />
            </label>

            <span className="todo__title">{ title }</span>

            {/* Remove button appears only on hover */}
            <button
              type="button"
              className="todo__remove"
            >
              ×
            </button>

            {/* overlay will cover the todo while it is being updated */}
            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </section>
  );
};
