import cn from 'classnames';
import { Status } from '../types/status';

type Props = {
  activeTasks: () => void;
  filterBy: Status;
  changeFilter: (newFilter: Status) => void;
};

const Footer: React.FC<Props> = ({ activeTasks, filterBy, changeFilter }) => {
  const { all, active, completed } = Status;

  const handleFilter = (newFilter: Status) => {
    changeFilter(newFilter);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTasks()} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filterBy === all })}
          onClick={() => handleFilter(Status.all)}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: filterBy === active })}
          onClick={() => handleFilter(Status.active)}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', { selected: filterBy === completed })}
          onClick={() => handleFilter(Status.completed)}
          data-cy="FilterLinkCompleted"
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
