import classNames from 'classnames';
import React from 'react';
import { Todo } from './types/Todo';

type Props = {
  todosToShow: Todo[],
};

export const TodoList: React.FC<Props> = ({ todosToShow }) => {
  return (
    <section className="todoapp__main">
      {/* This is a completed todo */}
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

          {/* Remove button appears only on hover */}
          <button type="button" className="todo__remove">×</button>

          {/* overlay will cover the todo while it is being updated */}
          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
