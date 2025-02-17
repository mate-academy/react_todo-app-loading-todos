/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import React from 'react';

interface Props {
  preparedTodos: Todo[];
}

export const Todos: React.FC<Props> = ({ preparedTodos }) => {
  return (
    <>
      {preparedTodos.map((todo: Todo) => (
        <div
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
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
    </>
  );
};
