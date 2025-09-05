import cn from 'classnames';
import { Todo } from '../types/Todo';
import React from 'react';

type Props = {
  visibleTodos: Todo[];
  loading: boolean;
};

export const TodoMain: React.FC<Props> = React.memo(
  ({ visibleTodos, loading }) => {
    return (
      <section className="todoapp__main" data-cy="TodoList">
        {visibleTodos.map(todo => (
          <div
            key={todo.id}
            data-cy="Todo"
            className={cn('todo', {
              completed: todo.completed,
            })}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
              />
              {}
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            <div
              data-cy="TodoLoader"
              className={cn('modal overlay', {
                'is-active': loading,
              })}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        ))}
      </section>
    );
  },
);

TodoMain.displayName = 'TodoMain';
