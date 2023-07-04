import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  visibleTodos: Todo[];
}

export const TodoList: React.FC<Props> = ({
  visibleTodos,
}) => {
  return (
    <section className="todoapp__main">
      {visibleTodos.map(todo => (
        <div
          className={cn('todo', {
            completed: todo.completed,
          })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              checked={todo.completed && true}
            />
          </label>

          <span className="todo__title">
            {todo.title}
          </span>

          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
          >
            ×
          </button>

          {/* overlay will cover the todo while it is being updated */}
          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
