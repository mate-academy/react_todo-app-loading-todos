import React from 'react';
import { Todo } from '../types/Todo';
import { TodoLoader } from './TodoLoader';

type Props = {
  todo: Todo;
  isLoading: boolean;
};

export const TodoItem: React.FC<Props> = ({ todo, isLoading }) => {
  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        {/* */}
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          readOnly
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>
      <TodoLoader isActive={isLoading} />
    </div>
  );
};
