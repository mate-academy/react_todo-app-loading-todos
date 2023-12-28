import classNames from 'classnames';
import { FilterType } from '../../types/FilterType';
import { useTodos } from '../../context';

export const Footer = () => {
  const { filter, setFilter, inProgress } = useTodos();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${inProgress} ${inProgress <= 1 ? 'item' : 'items'} left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link',
            { selected: (filter === FilterType.All) })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(FilterType.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link',
            { selected: (filter === FilterType.Active) })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(FilterType.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link',
            { selected: (filter === FilterType.Completed) })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(FilterType.Completed)}
        >
          Completed
        </a>
      </nav>

      { inProgress > 0 && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={() => setFilter(FilterType.All)}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
