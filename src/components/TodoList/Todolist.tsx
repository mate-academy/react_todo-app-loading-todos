import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  visibleTodos: Todo[];
}

export const TodoList: React.FC<Props> = ({ visibleTodos }) => {
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
                checked
              />
            </label>

            <span className="todo__title">{title}</span>

            <button type="button" className="todo__remove">
              ×
            </button>
          </div>
        );
      })}
    </section>
  );
};
