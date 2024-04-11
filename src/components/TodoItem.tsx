import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

type Props = {
  key: number;
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo, key }) => (
  <div
    key={key}
    data-cy="Todo"
    className={classNames('todo', {
      completed: todo.completed,
    })}
  >
    <label className="todo__status-label">
      <input
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        checked={todo.completed}
        aria-label="todo-status"
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
