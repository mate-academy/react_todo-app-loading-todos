import { StatusFilter } from '../../types/statusFilter';
import cn from 'classnames';

type FooterProps = {
  todosLeft: number;
  status: StatusFilter;
  onStatusChange: (filter: StatusFilter) => void;
};

export const Footer: React.FC<FooterProps> = ({
  todosLeft,
  status,
  onStatusChange,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosLeft} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href={`#/${StatusFilter.All}`}
          className={cn('filter__link', {
            selected: status === StatusFilter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onStatusChange(StatusFilter.All)}
        >
          All
        </a>

        <a
          href={`#/${StatusFilter.Active}`}
          className={cn('filter__link', {
            selected: status === StatusFilter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => onStatusChange(StatusFilter.Active)}
        >
          Active
        </a>

        <a
          href={`#/${StatusFilter.Completed}`}
          className={cn('filter__link', {
            selected: status === StatusFilter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onStatusChange(StatusFilter.Completed)}
        >
          Completed
        </a>
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

export default Footer;
