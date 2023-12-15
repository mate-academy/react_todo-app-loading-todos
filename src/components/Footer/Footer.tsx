import cn from 'classnames';
import { FilterBy } from '../../types/FilterBy';
import { Todo } from '../../types/Todo';

interface Props {
  todosFromServer: Todo[],
  filterBy: FilterBy,
  setFilterBy: React.Dispatch<React.SetStateAction<FilterBy>>,
}

export const Footer: React.FC<Props> = (props: Props) => {
  const {
    todosFromServer,
    filterBy,
    setFilterBy,
  } = props;

  const uncompletedTodosCount = todosFromServer
    .filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${uncompletedTodosCount} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterBy === FilterBy.All,
          })}
          onClick={() => setFilterBy(FilterBy.All)}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterBy === FilterBy.Active,
          })}
          onClick={() => setFilterBy(FilterBy.Active)}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterBy === FilterBy.Completed,
          })}
          onClick={() => setFilterBy(FilterBy.Completed)}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={todosFromServer.every(todo => !todo.completed)}
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
