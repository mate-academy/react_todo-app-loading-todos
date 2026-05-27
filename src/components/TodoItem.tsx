/* eslint-disable jsx-a11y/label-has-associated-control */

import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  toggleTodo: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, toggleTodo }) => {
  return (
    <div
      key={todo.id}
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>
      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      <div data-cy="TodoLoader" className="modal owerlay">
        <div className="modal-background has-background-white-ter">
          <div className="loader" />
        </div>
      </div>
    </div>
  );
};
