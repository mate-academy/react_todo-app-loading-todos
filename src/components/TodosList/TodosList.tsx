import cn from 'classnames';
import React from 'react';
import { ErrorType } from '../../types/ErrorType';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onError: (errorType: ErrorType) => void;
};

export const TodosList: React.FC<Props> = React.memo(({
  todos,
  onError,
}) => (
  <>
    {todos.map(({ title, completed, id }) => (
      <div
        data-cy="Todo"
        className={cn(
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
            onClick={() => onError(ErrorType.UPDATE)}
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          {title}
        </span>

        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDeleteButton"
          onClick={() => onError(ErrorType.DELETE)}
        >
          ×
        </button>

        <div data-cy="TodoLoader" className="modal overlay">
          <div
            className="modal-background has-background-white-ter"
          />
          <div className="loader" />
        </div>
      </div>
    ))}
  </>
));
