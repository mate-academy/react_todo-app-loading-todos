import cn from 'classnames';
import { Filters } from '../../types/Filters';
import { Todo } from '../../types/Todo';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  activeTodos: Todo[] | undefined;
  status: Filters;
  setStatus: Dispatch<SetStateAction<Filters>>;
};

export const Footer: React.FC<Props> = props => {
  const { activeTodos, status, setStatus } = props;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos?.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: status === Filters.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => {
            setStatus(Filters.All);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: status === Filters.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => {
            setStatus(Filters.Active);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: status === Filters.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            setStatus(Filters.Completed);
          }}
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
