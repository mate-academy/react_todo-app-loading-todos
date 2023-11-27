import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  onDelete: (value: number) => void,
  onCheckedToggle: (value: number) => void,
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({
  onDelete,
  onCheckedToggle,
  todos,
}) => {
  return (
    <>
      {todos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={cn('todo', {
            'todo completed': todo.completed,
          })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onClick={() => onCheckedToggle(todo.id)}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDelete(todo.id)}
          >
            ×
          </button>

          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </>
  );
};
