import { Filter } from '../../types/Filters';
import cn from 'classnames';

type Props = {
  countActiveTodos: number;
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export const Footer: React.FC<Props> = ({
  countActiveTodos,
  filter,
  setFilter,
}) => {
  const filterOptionName = Object.values(Filter);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${countActiveTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filterOptionName.map(filterValue => {
          const filterActiveUrl =
            filterValue === Filter.All
              ? '#/'
              : `#/${filterValue.toLowerCase()}`;

          return (
            <a
              key={filterValue}
              href={filterActiveUrl}
              className={cn('filter__link', {
                selected: filter === filterValue,
              })}
              data-cy={`FilterLink${filterValue}`}
              onClick={() => setFilter(filterValue)}
            >
              {filterValue}
            </a>
          );
        })}
      </nav>

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
