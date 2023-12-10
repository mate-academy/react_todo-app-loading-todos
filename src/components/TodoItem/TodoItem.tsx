import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { DispatchContext } from '../../Store';
import { TodoLoader } from '../TodoLoader';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};
export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;
  const dispatch = useContext(DispatchContext);
  const [isLoading] = useState(false);

  return (
    <div
      data-cy="Todo"
      className={cn('todo', { completed })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          checked={completed}
          data-cy="TodoStatus"
          className="todo__status"
          onChange={() => dispatch({ type: 'toggleCompletion', payload: todo })}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      <button
        type="button"
        data-cy="TodoDelete"
        aria-label="Delete todo"
        className="todo__remove"
        onClick={() => dispatch({ type: 'deleteTodo', payload: todo })}
      >
        ×
      </button>

      <TodoLoader isLoading={isLoading} />
    </div>
  );
};
