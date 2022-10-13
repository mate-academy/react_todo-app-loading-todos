import classNames from 'classnames';
import { FilterValues } from '../../types/FilterValues';

type Props = {
  filterTodos: (value: string) => void;
  countActive: number;
  filterValue: FilterValues;
};

export const Footer: React.FC<Props> = (
  { filterTodos, countActive, filterValue },
) => {
  const { All, Active, Completed } = FilterValues;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    filterTodos((e.target as HTMLAnchorElement).text);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${countActive} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filterValue === All },
          )}
          onClick={handleClick}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filterValue === Active },
          )}
          onClick={handleClick}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filterValue === Completed },
          )}
          onClick={handleClick}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
