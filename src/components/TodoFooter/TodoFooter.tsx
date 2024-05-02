import React, { useEffect, useState } from 'react';

import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { Filters } from '../../types/Filters';

type Props = {
  todos: Todo[];
  loadCompletedTodos: () => void;
  loadActiveTodos: () => void;
  loadAllTodos: () => void;
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  loadCompletedTodos,
  loadActiveTodos,
  loadAllTodos,
}) => {
  const uncompletedTodos = todos.filter(item => item.completed).length;
  const filtersStatus = Object.keys(Filters);
  const [currentFilter, setCurrentFilter] = useState<string>(Filters.All);

  useEffect(() => {
    switch (currentFilter) {
      case Filters.All: {
        return loadAllTodos();
      }
      case Filters.Completed: {
        return loadCompletedTodos();
      }
      case Filters.Active: {
        return loadActiveTodos();
      }
    }
  }, [currentFilter]);

  return (
    <>
      {/* Hide the footer if there are no todos */}
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {uncompletedTodos} items left
        </span>
        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          {filtersStatus.map(status => (
            <a
              key={status}
              onClick={() => setCurrentFilter(status)}
              href={`#/${status.toLowerCase()}`}
              className={cn('filter__link', {
                selected: currentFilter === status,
              })}
              data-cy={`FilterLink${status}`}
            >
              {status}
            </a>
          ))}
        </nav>
        {/* this button should be disabled if there are no completed todos */}
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
