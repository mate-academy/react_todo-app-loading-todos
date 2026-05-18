import cn from 'classnames';

type Props = {
  completed: boolean | null;
  onCompleted: (filter: boolean | null) => void;
  activeTodosCount: number;
};

export function TodoFooter({
  completed,
  onCompleted,
  activeTodosCount,
}: Props) {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: completed === null,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onCompleted(null)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: completed === false,
          })}
          data-cy="FilterLinkActive"
          onClick={() => onCompleted(false)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: completed === true,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onCompleted(true)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
}
