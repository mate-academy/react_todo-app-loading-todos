import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todoList: Todo,
};

export const TodoInfo: React.FC<Props> = React.memo(({
  todoList,
}) => {
  const { title, completed } = todoList;

  return (
    <>
      <div
        data-cy="Todo"
        className={classNames(
          'todo',
          { completed },
        )}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">{title}</span>
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDeleteButton"
        >
          ×
        </button>
      </div>
    </>
  );
});
