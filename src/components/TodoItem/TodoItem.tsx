import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { TodoLoader } from '../TodoLoader/TodoLoader';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;

  const [itemLoading, setItemLoading] = useState(false);

  useEffect(() => {
    if (!todo) {
      setItemLoading(true);
    }
  }, [todo]);

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          value={title}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>
      <TodoLoader
        itemLoading={itemLoading}
      />
    </div>
  );
};
