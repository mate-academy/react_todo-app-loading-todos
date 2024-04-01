/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const Main: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return (
          <div
            key={todo.id}
            data-cy="Todo"
            className={classNames(!todo.completed ? 'todo' : 'todo completed')}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onChange={() => {}}
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
        );
      })}
    </section>
  );
};
