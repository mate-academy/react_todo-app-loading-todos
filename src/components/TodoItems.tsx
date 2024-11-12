import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { deleteTodos, updateTodos } from '../api/todos';

interface ItemProps extends Todo {}

export const TodoItems: React.FC<ItemProps> = ({ id, title, completed }) => {
  const onDelete = () => {
    deleteTodos(id);
  };

  const ChangedBox = () => {
    updateTodos({ id, objectData: { completed: !completed } });
  };

  return (
    <div
      key={id}
      data-cy="Todo"
      className={cn('todo', { completed: completed })}
    >
      <label htmlFor="title" className="todo__status-label">
        {''}
        <input
          data-cy="TodoStatus"
          type="checkbox"
          id="title"
          className="todo__status"
          checked={completed}
          onChange={ChangedBox}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={onDelete}
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
