import React from 'react';
import classNames from 'classnames';
import { AddableTodoProps } from './AddableTodoProps';

export const AddableTodo: React.FC<AddableTodoProps> = ({
  isLoading,
  todoTitle,
}) => {
  return (
    <>
      {isLoading && (
        <div
          data-cy="Todo"
          className="todo"
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
          </label>
          <span data-cy="TodoTitle" className="todo__title">
            {todoTitle}
          </span>
          <div
            data-cy="TodoLoader"
            className={classNames(
              'modal overlay',
              { 'is-active': isLoading },
            )}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )}
    </>
  );
};
