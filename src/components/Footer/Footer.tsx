import { FC } from 'react';
import classNames from 'classnames';
import { Filter } from '../../types/Filter';

type Props = {
  onfilter: (arg: Filter) => void,
  filterType: Filter,
};

export const Footer: FC<Props> = ({ onfilter, filterType }) => (
  <footer className="todoapp__footer">
    <span className="todo-count">
      3 items left
    </span>

    <nav className="filter">
      <a
        href="#/"
        className={classNames(
          'filter__link',
          { selected: filterType === Filter.All },
        )}
        onClick={() => onfilter(Filter.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames(
          'filter__link',
          { selected: filterType === Filter.Active },
        )}
        onClick={() => onfilter(Filter.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames(
          'filter__link',
          { selected: filterType === Filter.Completed },
        )}
        onClick={() => onfilter(Filter.Completed)}
      >
        Completed
      </a>
    </nav>

    {/* don't show this button if there are no completed todos */}
    <button type="button" className="todoapp__clear-completed">
      Clear completed
    </button>
  </footer>
);
