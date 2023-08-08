import cn from 'classnames';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  filterStatus: FilterStatus,
  onFilterStatus: (filterStatus: FilterStatus) => void,
};

export const TodoFooter: React.FC<Props> = ({
  filterStatus,
  onFilterStatus,
}) => {
  const handleFilterChanging = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    newStatus: FilterStatus,
  ) => {
    event.preventDefault();
    if (newStatus !== filterStatus) {
      onFilterStatus(newStatus);
    }
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={cn(
            'filter__link',
            { selected: filterStatus === FilterStatus.All },
          )}
          onClick={(event) => (
            handleFilterChanging(event, FilterStatus.All)
          )}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn(
            'filter__link',
            { selected: filterStatus === FilterStatus.Active },
          )}
          onClick={(event) => (
            handleFilterChanging(event, FilterStatus.Active)
          )}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn(
            'filter__link',
            { selected: filterStatus === FilterStatus.Completed },
          )}
          onClick={(event) => (
            handleFilterChanging(event, FilterStatus.Completed)
          )}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
