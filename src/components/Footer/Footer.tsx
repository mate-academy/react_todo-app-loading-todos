/* eslint-disable jsx-a11y/control-has-associated-label */

type Props = {
  filterTodos: (value: string) => void;
  countActive: number;
  filterValue: string;
};

export const Footer: React.FC<Props> = (
  { filterTodos, countActive, filterValue },
) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${countActive} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={`filter__link ${filterValue === 'All' && 'selected'}`}
          onClick={(e) => {
            filterTodos((e.target as HTMLAnchorElement).text);
          }}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={`filter__link ${filterValue === 'Active' && 'selected'}`}
          onClick={(e) => {
            filterTodos((e.target as HTMLAnchorElement).text);
          }}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={`filter__link ${filterValue === 'Completed' && 'selected'}`}
          onClick={(e) => {
            filterTodos((e.target as HTMLAnchorElement).text);
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
