/* eslint-disable no-constant-condition */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | null;
};

export const Todos: React.FC<Props> = ({
  todos,
}) => {
  return (
    <div>
      {todos?.map(todo => (
        <div
          key={todo.id}
          id={`${todo.id}`}
          className={classNames('todo', { completed: todo.completed })}
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              readOnly
            />
          </label>
          {false ? (
            <form>
              <input
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={todo.title}
              />
            </form>
          )
            : (
              <>
                <span
                  className="todo__title"
                >
                  {todo.title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                >
                  ×
                </button>
              </>
            )}
          <div className={classNames(
            'modal',
            'overlay',
          )}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </div>
  );
};
