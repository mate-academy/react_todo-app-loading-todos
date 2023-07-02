import cn from 'classnames';
import { Filters } from '../types/Filters';

type Props = {
  isAnyCompleted: boolean;
  todosCount: number;
  onFilterChange: (newFilter: Filters) => void;
  selectedFilter: Filters;
};

export const Footer: React.FC<Props> = ({
  isAnyCompleted,
  todosCount,
  onFilterChange,
  selectedFilter,
}) => {
  const handleFilterChange = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    newFilter: Filters,
  ) => {
    event.preventDefault();
    onFilterChange(newFilter);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todosCount} items left`}
      </span>

      <nav className="filter">
        {(Object.keys(Filters) as Array<keyof typeof Filters>).map(key => (
          <a
            href={`#/${key}`}
            className={cn(
              'filter__link',
              { selected: selectedFilter === Filters[key] },
            )}
            key={key}
            onClick={(event) => handleFilterChange(event, Filters[key])}
          >
            {key}
          </a>
        ))}
      </nav>

      {isAnyCompleted && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
