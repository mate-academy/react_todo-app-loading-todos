import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type TodoItemProps = {
  todo: Todo;
  onCheckTodo: (todoId: number) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onCheckTodo }) => {
  const { id, completed, title } = todo;

  return (
    <div
      key={id}
      data-cy="Todo"
      className={cn('todo', { completed: completed })}
    >
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          value={title}
          checked={completed}
          onChange={() => onCheckTodo(id)}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      {/* Remove button appears only on hover */}
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div data-cy="TodoLoader" className="modal overlay">
        <div className={cn('modal-background', ' has-background-white-ter')} />
        <div className="loader" />
      </div>
    </div>
  );
};
