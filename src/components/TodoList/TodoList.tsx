import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="todoapp__main">
    {todos.map(({ id, title, completed }) => (
      <div
        key={id}
        className={classNames('todo', {
          completed,
        })}
      >
        <label className="todo__status-label">
          <input
            type="checkbox"
            className="todo__status"
            checked
          />
        </label>

        <span className="todo__title">{title}</span>

        <button
          type="button"
          className="todo__remove"
        >
          ×
        </button>

        <div className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    ))}
  </section>
);
