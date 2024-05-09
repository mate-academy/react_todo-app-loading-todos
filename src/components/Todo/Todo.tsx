import React from 'react';
import { typeTodo } from '../../types/Todo';
import classNames from 'classnames';

interface Props {
  todo: typeTodo,
}

export const Todo: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;

  return (
    <div
      data-cy="Todo"
      className={classNames(
        "todo",
        { "completed": completed, }
      )}>
      <label className="todo__status-label" htmlFor="todoCheckbox">
        <input
          id="todoCheckbox" // Add an id to the input element
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
