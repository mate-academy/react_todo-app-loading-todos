import cn from 'classnames';
import { TodoFilter } from '../types/TodoFilter';

type Props = {
  onSetFilter: (filter: TodoFilter) => void;
  activeListLength?: number;
  filter: TodoFilter;
};

export const TodoFooter: React.FC<Props> = ({
  onSetFilter,
  activeListLength,
  filter,
}) => {
  function handleFilter(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const newFilter = event.currentTarget.textContent as TodoFilter;

    onSetFilter(newFilter);
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeListLength} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {/* Рендеринг фільтрів з використанням Object.values(TodoFilter) */}
        {Object.values(TodoFilter).map((filterType) => (
          <a
            key={filterType}
            href={`#/${filterType.toLowerCase()}`}
            className={cn('filter__link', {
              selected: filter === filterType,
            })}
            data-cy={`FilterLink${filterType}`}
            onClick={handleFilter}
          >
            {filterType}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={activeListLength === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
