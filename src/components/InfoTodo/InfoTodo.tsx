import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { updateTodo, deleteTodo } from '../../api/todos';

type Props = {
  todo: Todo;
};

export const InfoTodo: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;

  return (
    <div data-cy="Todo" className={classNames('todo', { completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={() => updateTodo(todo.id, { completed: !completed })}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDeleteButton"
        onClick={() => deleteTodo(todo.id)}
      >
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
