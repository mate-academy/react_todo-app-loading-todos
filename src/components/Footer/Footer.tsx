import { FC, Dispatch } from 'react';
import { FilterOptions } from '../../utils/FilterOptions';
import cn from 'classnames';

interface Props {
  filterOption: FilterOptions;
  numberOfActiveTodos: number;
  setFilterOption: Dispatch<React.SetStateAction<FilterOptions>>;
}

export const Footer: FC<Props> = ({
  numberOfActiveTodos,
  setFilterOption,
  filterOption,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {numberOfActiveTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterOption === FilterOptions.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterOption(FilterOptions.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterOption === FilterOptions.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterOption(FilterOptions.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterOption === FilterOptions.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterOption(FilterOptions.Completed)}
        >
          Completed
        </a>
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
