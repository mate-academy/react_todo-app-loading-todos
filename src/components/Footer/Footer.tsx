import cn from 'classnames';
import { FilterTypes } from '../../types/FIlterTypes';

type Props = {
  filterType: FilterTypes,
  setFilterType: (filter: FilterTypes) => void,
};

export const Footer: React.FC<Props> = ({ filterType, setFilterType }) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: FilterTypes.ALL === filterType,
          })}
          onClick={() => setFilterType(FilterTypes.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: FilterTypes.ACTIVE === filterType,
          })}
          onClick={() => setFilterType(FilterTypes.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: FilterTypes.COMPLETED === filterType,
          })}
          onClick={() => setFilterType(FilterTypes.COMPLETED)}
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
