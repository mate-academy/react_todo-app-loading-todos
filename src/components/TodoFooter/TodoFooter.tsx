import './TodoFooter.scss';
import { FilterTypes } from '../../types/FilterTypes';
import { clsx } from 'clsx';

interface Props {
  activeTodos: number;
  filterType: FilterTypes;
  onFilterTypeChange: (type: FilterTypes) => void;
}

export const TodoFooter = ({
  activeTodos,
  filterType,
  onFilterTypeChange,
}: Props) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={clsx('filter__link', {
            selected: filterType === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => onFilterTypeChange('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={clsx('filter__link', {
            selected: filterType === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => onFilterTypeChange('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={clsx('filter__link', {
            selected: filterType === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilterTypeChange('completed')}
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
