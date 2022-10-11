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
          className={`filter__link ${filterValue === All && 'selected'}`}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={`filter__link ${filterValue === Active && 'selected'}`}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={`filter__link ${filterValue === Completed && 'selected'}`}
          onClick={(e) => {
            handleClick(e);
          }}
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
