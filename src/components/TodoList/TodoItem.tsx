import React from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  return (
    <div data-cy="Todo" className={`todo ${completed ? 'completed' : ''}`}>
      <label className="todo__status-label" htmlFor={`todo-status-${id}`}>
        <input
          id={`todo-status-${id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          disabled
        />
        {title}
      </label>
      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        disabled
      >
        ×
      </button>

      {todo.isLoading && <Loader />}
    </div>
  );
};
