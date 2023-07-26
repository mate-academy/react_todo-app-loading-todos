import classNames from 'classnames';
import { SortByStatus } from '../../types/SortByStatus';

type Props = {
  sortBy: SortByStatus,
  numberActiveTodos: number,
  onChangeSortBy: (sortBy: SortByStatus) => void,
  hasCompletedTodo: boolean,
};

export const Footer: React.FC<Props> = ({
  sortBy,
  numberActiveTodos,
  onChangeSortBy,
  hasCompletedTodo,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {numberActiveTodos}
        {' '}
        items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: sortBy === SortByStatus.All },
          )}
          onClick={() => onChangeSortBy(SortByStatus.All)}
        >
          All
        </a>

        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: sortBy === SortByStatus.Active },
          )}
          onClick={() => onChangeSortBy(SortByStatus.Active)}
        >
          Active
        </a>

        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: sortBy === SortByStatus.Completed },
          )}
          onClick={() => onChangeSortBy(SortByStatus.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      {hasCompletedTodo && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
