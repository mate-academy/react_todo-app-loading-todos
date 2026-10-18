import React from 'react';
import classNames from 'classnames';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label
        className="todo__status-label"
        htmlFor={`todo-status-${todo.id}`}
        aria-label="Todo status"
      >
        <input
          id={`todo-status-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          readOnly
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div
          className={classNames('modal-background', 'has-background-white-ter')}
        />
        <div className="loader" />
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
