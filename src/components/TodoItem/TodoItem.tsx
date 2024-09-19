import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, completed, title } = todo;

  return (
    <div
      data-cy="Todo"
      className={cn('todo', { completed: completed })}
      key={id}
    >
      <label className="todo__status-label" htmlFor={`todo-status-${id}`}>
        <input
          data-cy="TodoStatus"
          id={`todo-status-${id}`}
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
        {/* Add accessible text */}
        <span className="sr-only">
          Mark as {completed ? 'incomplete' : 'complete'}
        </span>
      </label>
      {false ? (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
          />
        </form>
      ) : (
        <span data-cy="TodoTitle" className="todo__title">
          {title}
        </span>
      )}
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>
      {/* <div data-cy="TodoLoader" className="modal overlay "> */}
      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', { 'is-active': false })}
      >
        {/* eslint-disable-next-line max-len */}
        <div className="modal-background has-background-white-ter" />
        {/* eslint-enable max-len */}
        <div className="loader" />
      </div>
    </div>
  );
};
