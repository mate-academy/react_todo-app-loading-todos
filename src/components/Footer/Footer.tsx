import { QueryType } from '../../types/QueryType';
import cn from 'classnames';

interface Props {
  isSubmitting: boolean;
  notCompletedTodosCount: number;
  setQuery: (value: React.SetStateAction<QueryType>) => void;
  query: string;
}

export const Footer = ({
  notCompletedTodosCount,
  isSubmitting,
  setQuery,
  query,
}: Props) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTodosCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          onClick={() => setQuery(QueryType.All)}
          href="#/"
          className={cn('filter__link', {
            selected: query === QueryType.All,
          })}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          onClick={() => setQuery(QueryType.Active)}
          href="#/active"
          className={cn('filter__link', {
            selected: query === QueryType.Active,
          })}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          onClick={() => setQuery(QueryType.Completed)}
          href="#/completed"
          className={cn('filter__link', {
            selected: query === QueryType.Completed,
          })}
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
        disabled={isSubmitting}
      >
        Clear completed
      </button>
    </footer>
  );
};
