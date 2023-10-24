import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  deleteTodo: (todo: Todo) => void,
  todoCompleteUpdate: (todo: Todo) => void,
  activeFilter: string;
};

export const TodoItem: React.FC<Props> = ({
  todos,
  deleteTodo,
  todoCompleteUpdate,
  activeFilter,
}) => {
  const filteredTodos = todos.filter((todo) => {
    if (activeFilter === 'active') {
      return !todo.completed;
    }

    if (activeFilter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <>
      {filteredTodos.map(todo => (
        <div
          data-cy="Todo"
          className={cn('todo', { completed: todo.completed })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => todoCompleteUpdate(todo.id, !todo.completed)}
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
            onClick={() => deleteTodo(todo)}
          >
            ×
          </button>
        </div>
      ))}
    </>
  );
};
