/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import cn from 'classnames';
import { Todo } from './types/Todo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => {
      const { id, completed, title } = todo;

      return (
        <div
          data-cy="Todo"
          className={cn('todo', { completed: completed })}
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
