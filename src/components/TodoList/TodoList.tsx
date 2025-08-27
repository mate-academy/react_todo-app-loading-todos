import { useMemo } from 'react';

import { FilterOptions } from '../../types/FilterOptions';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  filterOption: FilterOptions;
};

export const TodoList: React.FC<Props> = ({ todos, filterOption }) => {
  const visibleTodos = useMemo(() => {
    let result = todos;

    if (filterOption === FilterOptions.Active) {
      result = todos.filter(todo => !todo.completed);
    }

    if (filterOption === FilterOptions.Completed) {
      result = todos.filter(todo => todo.completed);
    }

    if (filterOption === FilterOptions.All) {
      return result;
    }

    return result;
  }, [filterOption, todos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {visibleTodos.map((todo: Todo) => {
        return (
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
};
