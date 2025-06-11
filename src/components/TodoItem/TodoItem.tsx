import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  toggleTodoStatus: (id: number) => void;
  deleteTodo: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  toggleTodoStatus,
  deleteTodo,
}) => (
  <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
    <label className="todo__status-label">
      <input
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        aria-label="Toggle todo status"
        checked={todo.completed}
        onChange={() => toggleTodoStatus(todo.id)}
      />
    </label>

    <span data-cy="TodoTitle" className="todo__title">
      {todo.title}
    </span>

    <button
      type="button"
      className="todo__remove"
      data-cy="TodoDelete"
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
