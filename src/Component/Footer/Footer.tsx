import cn from 'classnames';
import { FilterBy } from '../../types/FilterBy';

type Props = {
  filterValue: FilterBy;
  activeTodosCount: number;
  complitedTodosCount: number;
  setFilterValue: (value: FilterBy) => void;
};

export const Footer: React.FC<Props> = ({
  activeTodosCount, complitedTodosCount, filterValue, setFilterValue,
}) => {
  const handleFilterChange = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const value = event.currentTarget.innerText as FilterBy;

    setFilterValue(value);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodosCount} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterValue === FilterBy.ALL,
          })}
          onClick={(event) => handleFilterChange(event)}
        >
          {FilterBy.ALL}
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterValue === FilterBy.ACTIVE,
          })}
          onClick={(event) => handleFilterChange(event)}
        >
          {FilterBy.ACTIVE}
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterValue === FilterBy.COMPLETED,
          })}
          onClick={(event) => handleFilterChange(event)}
        >
          {FilterBy.COMPLETED}
        </a>
      </nav>

      {complitedTodosCount && (
        <button
          type="button"
          className="todoapp__clear-completed"
          disabled={complitedTodosCount === 0}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
