import cn from 'classnames';
import { FilterType } from '../../types/FilterType';

type Props = {
  selectedFilter: FilterType;
  handleFilterChange: (filter: FilterType) => void;
};

export const Footer: React.FC<Props> = ({
  selectedFilter,
  handleFilterChange,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={cn(
            'filter__link',
            { selected: selectedFilter === FilterType.all },
          )}
          onClick={() => handleFilterChange(FilterType.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn(
            'filter__link',
            { selected: selectedFilter === FilterType.active },
          )}
          onClick={() => handleFilterChange(FilterType.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn(
            'filter__link',
            { selected: selectedFilter === FilterType.completed },
          )}
          onClick={() => handleFilterChange(FilterType.completed)}
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
