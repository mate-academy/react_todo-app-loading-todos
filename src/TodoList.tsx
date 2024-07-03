/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { Status } from './types/status';

interface TodoListProps {
  todosByStatus: (query?: Status) => Todo[];
  checkedUnchecked: (id: number) => void;
  queryStatus: Status;
}

export const TodoList: React.FC<TodoListProps> = ({
  queryStatus,
  todosByStatus,
  checkedUnchecked,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosByStatus(queryStatus)?.map(todo => {
        const { id, title, completed } = todo;

        return (
          <div
            data-cy="Todo"
            className={classNames('todo', { completed: completed })}
            key={id}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={completed}
                onChange={() => checkedUnchecked(id)}
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {title}
            </span>

            {/* Remove button appears only on hover */}
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            {/* 'is-active' class puts this modal on top of the todo */}
            <div data-cy="TodoLoader" className="modal overlay">
              <div
                className="modal-background
              has-background-white-ter"
              />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </section>
  );
};
