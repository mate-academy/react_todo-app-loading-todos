/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    <div className={classNames('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
      </label>

      <span className="todo__title">{todo.title}</span>

      {/* Remove button appears only on hover */}
      <button type="button" className="todo__remove">×</button>
    </div>
  );
};
