import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

type TodoItemProps = {
  todo: Todo;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo: { completed, title } }) => (
  <div data-cy="Todo" className={classNames('todo', { completed })}>
    {/* eslint-disable jsx-a11y/label-has-associated-control */}
    <label className="todo__status-label">
      <input
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        checked={completed}
      />
    </label>

    <span className="todo__title" data-cy="TodoTitle">
      {title}
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

export default TodoItem;
