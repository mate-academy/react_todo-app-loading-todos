import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    <div
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
      </label>

      <span className="todo__title">{todo.title}</span>
      <button type="button" className="todo__remove">×</button>

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};

export default TodoItem;
