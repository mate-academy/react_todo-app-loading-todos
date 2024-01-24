import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { FilterValue } from '../types/FilterValue';

type Props = {
  todos: Todo[];
  filterChange: (filter: FilterValue) => void;
  filterValue: FilterValue;
};

export const TodoFooter: React.FC<Props> = (
  { todos, filterChange, filterValue },
) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link',
            {
              selected: filterValue === FilterValue.All,
            })}
          data-cy="FilterLinkAll"
          onClick={() => filterChange(FilterValue.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link',
            {
              selected: filterValue === FilterValue.Active,
            })}
          data-cy="FilterLinkActive"
          onClick={() => filterChange(FilterValue.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link',
            {
              selected: filterValue === FilterValue.Completed,
            })}
          data-cy="FilterLinkCompleted"
          onClick={() => filterChange(FilterValue.Completed)}
        >
          Completed
        </a>
      </nav>

    </footer>
  );
};
