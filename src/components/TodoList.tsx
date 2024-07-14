/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  onStatusChange: (id: number, isCompleted: boolean) => void;
  isCompleted: boolean;
  isLoaderVisible: boolean;
  updatedTodoId?: number | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  deleteTodo,
  onStatusChange,
  updatedTodoId,
}) => (
  <div>
    {todos.map(todo => (
      <div
        key={todo.id}
        data-cy="Todo"
        className={classNames('todo', { completed: todo.completed })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onChange={() => onStatusChange(todo.id, !todo.completed)}
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          {todo.title}
        </span>

        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => {
            deleteTodo(todo.id);
          }}
        >
          ×
        </button>

        {updatedTodoId === todo.id && (
          <div data-cy="TodoLoader" className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        )}
      </div>
    ))}
  </div>
);
