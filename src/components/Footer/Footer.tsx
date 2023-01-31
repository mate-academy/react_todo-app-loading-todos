import classNames from 'classnames';
import { FilterStatus } from '../../enums/Status';

type Props = {
  activeFilter: FilterStatus,
  setFilter: React.Dispatch<React.SetStateAction<FilterStatus>>,
};

export const Footer: React.FC<Props> = ({ setFilter, activeFilter }) => {
  const handleClick = (event: React.MouseEvent) => {
    const option = event.currentTarget.textContent;

    setFilter(option as FilterStatus);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        4 items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            { selected: activeFilter === FilterStatus.ALL },
          )}
          onClick={handleClick}
        >
          {FilterStatus.ALL}
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: activeFilter === FilterStatus.ACTIVE },
          )}
          onClick={handleClick}
        >
          {FilterStatus.ACTIVE}
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: activeFilter === FilterStatus.COMPLETED },
          )}
          onClick={handleClick}
        >
          {FilterStatus.COMPLETED}
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
