import classNames from 'classnames';

export type FilterType = 'all' | 'active' | 'completed';

export type FooterProps = {
  filtering: (queru: FilterType) => void
  leftItems: () => number
  query: FilterType
};

export const Footer = ({ filtering, leftItems, query }: FooterProps) => {
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
          onClick={() => filtering('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link',
            { selected: query === 'active' })}
          data-cy="FilterLinkActive"
          onClick={() => filtering('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link',
            { selected: query === 'completed' })}
          data-cy="FilterLinkCompleted"
          onClick={() => filtering('completed')}
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
