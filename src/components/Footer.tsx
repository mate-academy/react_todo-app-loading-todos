import classNames from 'classnames';
// eslint-disable-next-line import/no-cycle
import { Filter } from '../App';

type Props = {
  filterStatus: Filter;
  onFilterChange(status: Filter): void;
  numberOfTodos: number | undefined;
};

export const Footer: React.FC<Props> = ({
  filterStatus,
  onFilterChange,
  numberOfTodos,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${numberOfTodos} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            {
              selected: filterStatus === Filter.All,
            },
          )}
          onClick={() => onFilterChange(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            {
              selected: filterStatus === Filter.Active,
            },
          )}
          onClick={() => onFilterChange(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            {
              selected: filterStatus === Filter.Completed,
            },
          )}
          onClick={() => onFilterChange(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
