import classNames from 'classnames';
import { FilterStatus } from '../../enums/enums';

type Props = {
  todosCompleted: number;
  todosActive: number;
  statusValue: FilterStatus;
  handleStatusValueChange: (statusValue: FilterStatus) => void;
};

const filters = Object.values(FilterStatus);

export const Footer: React.FC<Props> = ({
  todosCompleted,
  todosActive,
  statusValue,
  handleStatusValueChange,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todosActive} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map(filter => (
          <a
            key={filter}
            href={`#/${filter === FilterStatus.All ? '' : filter}`}
            data-cy={`FilterLink${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
            className={classNames('filter__link', {
              selected: statusValue === filter,
            })}
            onClick={() => handleStatusValueChange(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todosCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
