import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { FilterType } from '../../types/Filter';

type Props = {
  todos: Todo[];
  filterType: string;
  setFilterType: (value: string) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  filterType,
  setFilterType,
}) => {
  const handleFilter = (type: string) => {
    setFilterType(type);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filterType === FilterType.All },
          )}
          onClick={() => handleFilter(FilterType.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filterType === FilterType.Active },
          )}
          onClick={() => handleFilter(FilterType.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filterType === FilterType.Completed },
          )}
          onClick={() => handleFilter(FilterType.Completed)}
        >
          Completed
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
