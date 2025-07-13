/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Todo } from '../types/Todo';
import { Loader } from './Loader';

type Props = {
  todos: Todo[];
  isLoading: boolean;
};

export const TodoItem: React.FC<Props> = ({ todos, isLoading }) => {
  return (
    <>
      {todos.map(todo => (
        <div
          data-cy="Todo"
          className={`todo ${todo.completed ? 'completed' : ''}`}
          key={todo.id}
        >
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
          <Loader isLoading={isLoading} />
        </div>
      ))}
    </>
  );
};
