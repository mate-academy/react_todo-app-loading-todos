import { GroupStatusTypes } from '../../types/status';
import classNames from 'classnames';

type Props = {
  onClick: (status: GroupStatusTypes) => void;
  status: GroupStatusTypes; // Змінено тип зі string на GroupStatusTypes
  filteredTodods: number;
};

export const Footer: React.FC<Props> = ({
  onClick,
  status,
  filteredTodods,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {filteredTodods + ' items left'}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: status === GroupStatusTypes.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onClick(GroupStatusTypes.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: status === GroupStatusTypes.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => onClick(GroupStatusTypes.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: status === GroupStatusTypes.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onClick(GroupStatusTypes.COMPLETED)}
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
