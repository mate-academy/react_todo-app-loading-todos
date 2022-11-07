import classNames from 'classnames';

type Props = {
  fieldForSorting: string,
  selectFieldForSorting: (field: string) => void,
  counterActiveTodos: number,
};

export const Footer: React.FC<Props> = ({
  fieldForSorting,
  selectFieldForSorting,
  counterActiveTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${counterActiveTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link', {
            selected: fieldForSorting === 'all',
          })}
          onClick={() => selectFieldForSorting('all')}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link', {
            selected: fieldForSorting === 'active',
          })}
          onClick={() => selectFieldForSorting('active')}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link', {
            selected: fieldForSorting === 'completed',
          })}
          onClick={() => selectFieldForSorting('completed')}
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
