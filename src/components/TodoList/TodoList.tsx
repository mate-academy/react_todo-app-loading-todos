/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  visibleTodos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ visibleTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(({ id, title, completed }) => {
        return (
          <div
            data-cy="Todo"
            className={classNames('todo', {
              completed: completed,
            })}
            key={id}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={completed}
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {title}
            </span>

            {/* Remove button appears only on hover */}
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            {/* overlay will cover the todo while it is being deleted or updated */}
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </section>
  );
};
