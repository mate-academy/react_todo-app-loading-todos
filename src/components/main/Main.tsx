import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  visibleTodos: Todo[];
};

export const Main: React.FC<Props> = ({ visibleTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(toDo => {
        return (
          <div
            key={toDo.id}
            data-cy="Todo"
            className={`todo ${toDo.completed ? 'completed' : ''}`}
          >
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="todo__status-label">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={toDo.completed}
                readOnly
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {toDo.title}
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
