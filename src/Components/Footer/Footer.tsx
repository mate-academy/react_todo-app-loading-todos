import classNames from 'classnames';
import { FilterType } from '../../utils/FilterType';

type Props = {
  filterType: FilterType;
  setFilterType: (filter: FilterType) => void;
};

export const Footer: React.FC<Props> = ({
  filterType,
  setFilterType,
}) => {
  const hundleFiltering = (filter: FilterType) => {
    setFilterType(filter);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterType === FilterType.All,
          })}
          onClick={() => hundleFiltering(FilterType.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterType === FilterType.Active,
          })}
          onClick={() => hundleFiltering(FilterType.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterType === FilterType.Completed,
          })}
          onClick={() => hundleFiltering(FilterType.Completed)}
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
};
