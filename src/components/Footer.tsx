import classNames from 'classnames';
import { FilterStatus } from '../types/FilterStatus';

type Props = {
  setFilterStatus: (link: FilterStatus) => void;
  filterStatus: FilterStatus;
  todosActiveQuantity: number;
};

const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const Footer: React.FC<Props> = ({
  setFilterStatus,
  filterStatus,
  todosActiveQuantity,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosActiveQuantity} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterStatus).map(status => (
          <a
            key={status}
            href={`#/${status === FilterStatus.All ? '' : status}`}
            className={classNames('filter__link', {
              selected: filterStatus === status,
            })}
            data-cy={`FilterLink${capitalize(status)}`}
            onClick={() => setFilterStatus(status)}
          >
            {capitalize(status)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
