import { useMemo } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import cn from 'classnames';

interface Props {
  todos: Todo[];
  filter: Filter;
  handleCompletedChange: (id: number) => void;
}

export const TodoItem: React.FC<Props> = ({
  todos,
  filter,
  handleCompletedChange,
}) => {
  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case Filter.Active:
          return !todo.completed;

        case Filter.Completed:
          return todo.completed;

        default:
          return true;
      }
    });
  }, [todos, filter]);

  return (
    <div>
      {visibleTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={cn('todo', { completed: todo.completed })}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => handleCompletedChange(todo.id)}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            <div>{todo.title}</div>
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
      ))}
    </div>
  );
};
