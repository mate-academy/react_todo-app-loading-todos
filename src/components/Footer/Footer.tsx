import cn from 'classnames';
import { FilterTypes } from '../../types/FilterTypes';
import React from 'react';

interface Props {
  unfinishedTodoAmount: number;
  setFilterInstructions: (filterType: FilterTypes) => void;
  filterInstructions: FilterTypes;
}

export const Footer: React.FC<Props> = ({
  unfinishedTodoAmount,
  setFilterInstructions,
  filterInstructions,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${unfinishedTodoAmount} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterInstructions === FilterTypes.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterInstructions(FilterTypes.All)}
        >
          {FilterTypes.All}
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterInstructions === FilterTypes.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterInstructions(FilterTypes.Active)}
        >
          {FilterTypes.Active}
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterInstructions === FilterTypes.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterInstructions(FilterTypes.Completed)}
        >
          {FilterTypes.Completed}
        </a>
      </nav>

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
