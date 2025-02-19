import React from 'react';
import './TodoItem.scss';

import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  key: number;
  todo: Todo;
  loading: boolean;
};

export const TodoItem: React.FC<Props> = ({ key, todo, loading }) => {
  return (
    <div
      data-cy="Todo"
      className={cn('todo', { completed: todo.completed })}
      key={key}
    >
      <label className="todo__status-label" aria-label="Toggle todo status">
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

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', { 'is-active': loading })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
