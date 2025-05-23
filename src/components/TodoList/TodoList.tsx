import React, { memo } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = memo(({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return (
          // <div data-cy="Todo" className="todo completed" key={todo.id}>
          <div
            key={todo.id}
            data-cy="Todo"
            className={classNames('todo', { completed: todo.completed })}
          >
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor={`todo-${todo.id}`} className="todo__status-label">
              <input
                id={`todo-${todo.id}`}
                type="checkbox"
                className="todo__status"
                data-cy="TodoStatus"
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
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </section>
  );
});

TodoList.displayName = 'TodoList';
