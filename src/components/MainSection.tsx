/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

interface MainSectionProps {
  todos: Todo[];
  visibleTodos: Todo[];
}

export const MainSection: React.FC<MainSectionProps> = ({
  todos,
  visibleTodos,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.length > 0 && (
        <ul className="todo-list">
          {visibleTodos.map(todo => (
            <div
              data-cy="Todo"
              key={todo.id}
              className={classNames('todo', {
                completed: todo.completed,
              })}
            >
              <label
                className="todo__status-label"
                htmlFor={`todo-status-${todo.id}`}
              >
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
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              {/* overlay will cover the todo while it is being deleted or updated */}
              <div
                data-cy="TodoLoader"
                className={classNames('modal overlay', {
                  'is-active': false,
                })}
              >
                <div
                  className={classNames(
                    'modal-background',
                    'has-background-white-ter',
                  )}
                />
                <div className="loader" />
              </div>
            </div>
          ))}
        </ul>
      )}
    </section>
  );
};
