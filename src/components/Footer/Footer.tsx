import { FC } from 'react';
import classNames from 'classnames';
import { FilterType } from '../../App';

interface FooterProps {
  countActiveTodos: number;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export const Footer: FC<FooterProps> = ({
  countActiveTodos,
  filter,
  setFilter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countActiveTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === FilterType.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(FilterType.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === FilterType.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(FilterType.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === FilterType.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(FilterType.Completed)}
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
