import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

interface TodoListProps {
  preparedTodos: Todo[];
  isLoading: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({
  preparedTodos,
  isLoading,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {preparedTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
          <label className="todo__status-label">
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

          {/* Remove button appears only on hover */}
          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          {/* overlay will cover the todo while it is being deleted or updated */}
          <div
            data-cy="TodoLoader"
            className={classNames('modal overlay', {
              'is-loading': isLoading,
            })}
          >
            <div className="modal-background has-background-white-ter" />
            {isLoading && <div className="loader" />}
          </div>
        </div>
      ))}
    </section>
  );
};
