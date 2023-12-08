import classNames from 'classnames';
import { FilterType } from '../types/FilterType';

export type FooterProps = {
  setQuery: (queru: FilterType) => void
  leftItems: () => number
  query: FilterType
};

export const Footer = ({ setQuery, leftItems, query }: FooterProps) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${leftItems()} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', { selected: query === 'all' })}
          data-cy="FilterLinkAll"
          onClick={() => setQuery(FilterType.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link',
            { selected: query === 'active' })}
          data-cy="FilterLinkActive"
          onClick={() => setQuery(FilterType.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link',
            { selected: query === 'completed' })}
          data-cy="FilterLinkCompleted"
          onClick={() => setQuery(FilterType.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
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
