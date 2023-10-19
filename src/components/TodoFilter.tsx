import React from 'react';
import cn from 'classnames';
import { TodosFilter } from '../types/TodosFilter';
import { Todo } from '../types/Todo';

const setFilterHref = (filter: TodosFilter) => {
  switch (filter) {
    case TodosFilter.Active:
      return '#/active';

    case TodosFilter.Completed:
      return '#/completed';

    case TodosFilter.All:
    default:
      return '#/';
  }
};

const setFilterDataCy = (filter: TodosFilter) => {
  switch (filter) {
    case TodosFilter.Active:
      return 'FilterLinkActive';

    case TodosFilter.Completed:
      return 'FilterLinkCompleted';

    case TodosFilter.All:
    default:
      return 'FilterLinkAll';
  }
};

type Props = {
  todos: Todo[]
  filter: TodosFilter;
  uncopmletedTodos: number;
  onFilterChange: (filter: TodosFilter) => void;
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  filter,
  onFilterChange,
  uncopmletedTodos,
}) => {
  const completedTodos = todos.length - uncopmletedTodos;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      {/* Hide the footer if there are no todos */}
      <span className="todo-count" data-cy="TodosCounter">
        {uncopmletedTodos === 1
          ? `${uncopmletedTodos} item left`
          : `${uncopmletedTodos} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(TodosFilter).map((value) => (
          <a
            href={setFilterHref(value)}
            className={cn('filter__link', { selected: value === filter })}
            data-cy={setFilterDataCy(value)}
            key={value}
            onClick={() => {
              onFilterChange(value as TodosFilter);
            }}
          >
            {value}
          </a>
        ))}
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className={cn(
          'todoapp__clear-completed',
          { hidden: !completedTodos },
        )}
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
