import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { FilterBy } from '../types/FilterBy';

type Props = {
  todos: Todo[];
  filterBy: FilterBy;
  handleFilterBy: (filter: FilterBy) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  filterBy,
  handleFilterBy,
}) => {
  const todosRemoved = todos.filter(({ completed }) => !completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosRemoved} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filterBy === FilterBy.All },
          )}
          onClick={() => handleFilterBy(FilterBy.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filterBy === FilterBy.Active },
          )}
          onClick={() => handleFilterBy(FilterBy.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filterBy === FilterBy.Completed },
          )}
          onClick={() => handleFilterBy(FilterBy.Completed)}
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
