/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { TodoStatus } from '../../types/TodoStatus';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
};

export const Item: React.FC<Props> = ({ todo }) => {
  const [status] = useState<TodoStatus>(TodoStatus.Default);

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => {}}
        />
      </label>

      {status === TodoStatus.Editing ? (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value="Todo is being edited now"
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>
        </>
      )}

      <Loader isActive={status === TodoStatus.Loading} />
    </div>
  );
};
