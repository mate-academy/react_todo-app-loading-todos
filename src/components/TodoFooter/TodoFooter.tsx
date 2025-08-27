import { FilterOptions } from '../../types/FilterOptions';
import cn from 'classnames';

type Props = {
  todosLeft: number;
  handleFilterOption: (option: FilterOptions) => void;
  filterOption: FilterOptions;
};

export const TodoFooter: React.FC<Props> = ({
  todosLeft,
  handleFilterOption,
  filterOption,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosLeft} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterOption === FilterOptions.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleFilterOption(FilterOptions.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterOption === FilterOptions.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleFilterOption(FilterOptions.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterOption === FilterOptions.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleFilterOption(FilterOptions.Completed)}
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
