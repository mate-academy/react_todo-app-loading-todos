import classNames from 'classnames';
import { filterButton } from '../App';

type Props = {
  filteredButton: string;
  todosLeft: number;
  filterBy: (value: filterButton) => void;
};

export const Footer: React.FC<Props> = ({
  filteredButton,
  filterBy,
  todosLeft,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosLeft} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filteredButton === 'all',
          })}
          onClick={() => filterBy('all')}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filteredButton === 'active',
          })}
          onClick={() => filterBy('active')}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filteredButton === 'completed',
          })}
          onClick={() => filterBy('completed')}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
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
