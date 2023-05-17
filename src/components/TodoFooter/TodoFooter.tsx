import classNames from 'classnames';
import { Filter } from '../../types/FilterEnum';

interface Props {
  itemCounter: number;
  selectedFilter: Filter;
  onFilterSelect: (filter: Filter) => void;
}

export const TodoFooter: React.FC<Props> = ({
  itemCounter,
  selectedFilter,
  onFilterSelect,
}) => {
  const handleFilter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    switch (event.currentTarget.hash) {
      case '#/active':
        onFilterSelect(Filter.ACTIVE);
        break;
      case '#/completed':
        onFilterSelect(Filter.COMPLETED);
        break;
      default:
        onFilterSelect(Filter.ALL);
        break;
    }
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemCounter} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectedFilter === Filter.ALL,
          })}
          onClick={handleFilter}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selectedFilter === Filter.ACTIVE,
          })}
          onClick={handleFilter}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selectedFilter === Filter.COMPLETED,
          })}
          onClick={handleFilter}
        >
          Completed
        </a>
      </nav>

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
