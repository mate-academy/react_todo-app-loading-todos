import React from 'react';
import { Todo } from '../../types/Todo';
import { FilterStatus } from '../../types/FilterStatus';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  filter: FilterStatus;
  onFilter: (filter: FilterStatus) => void;
};

export const Footer: React.FC<Props> = ({ todos, filter, onFilter }) => {
  const activeTodos = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterStatus).map(filterStatus => (
          <a
            key={filterStatus}
            href="#/"
            className={cn('filter__link', {
              selected: filter === filterStatus,
            })}
            data-cy={`FilterLink${filterStatus}`}
            onClick={() => onFilter(filterStatus)}
          >
            {filterStatus}
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
  );
};
