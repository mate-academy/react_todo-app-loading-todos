import classNames from 'classnames';
import { Todo } from '../types/Todo';
import React from 'react';

type Props = {
  usingTodos: Todo[];
};

export const TodoMain: React.FC<Props> = ({ usingTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {usingTodos.map(x => (
        <div
          data-cy="Todo"
          key={x.id}
          className={classNames('todo', { completed: x.completed })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={x.completed}
              aria-label="Toggle todo status"
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {x.title}
          </span>

          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
