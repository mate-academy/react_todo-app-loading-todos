import { FC } from 'react';
import classNames from 'classnames';
import { FilterType } from '../../types/FilterType';

type Props = {
  amountCompletedTodos: number,
  filterType: FilterType,
  setFilterType: React.Dispatch<React.SetStateAction<FilterType>>,
};

const Footer: FC<Props> = ({
  amountCompletedTodos: completedTodos,
  filterType,
  setFilterType,
}) => (
  <footer className="todoapp__footer">
    <span className="todo-count">
      {completedTodos}
      {' items left'}
    </span>

    <nav className="filter">
      <a
        href="#/"
        data-select="all"
        className={classNames(
          'filter__link',
          { selected: filterType === FilterType.All },
        )}
        onClick={() => setFilterType(FilterType.All)}
      >
        All
      </a>

      <a
        href="#/active"
        data-select="active"
        className={classNames(
          'filter__link',
          { selected: filterType === FilterType.Active },
        )}
        onClick={() => setFilterType(FilterType.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        data-select="completed"
        className={classNames(
          'filter__link',
          { selected: filterType === FilterType.Completed },
        )}
        onClick={() => setFilterType(FilterType.Completed)}
      >
        Completed
      </a>
    </nav>

    <button
      type="button"
      className="todoapp__clear-completed"
    >
      Clear completed
    </button>
  </footer>
);

export default Footer;
