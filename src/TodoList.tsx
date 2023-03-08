import classNames from 'classnames';
import React from 'react';
import { Todo } from './types/Todo';

type Props = {
  todosToShow: Todo[],
};

export const TodoList: React.FC<Props> = ({ todosToShow }) => {
  return (
    <section className="todoapp__main">
      {todosToShow.map(({
        id, title, completed,
      }) => (
        <div
          className={classNames(
            'todo',
            { completed },
          )}
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

          <button type="button" className="todo__remove">×</button>

          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
