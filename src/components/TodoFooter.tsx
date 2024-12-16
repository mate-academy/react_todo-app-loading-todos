import React, { Dispatch, SetStateAction } from 'react';
import cn from 'classnames';
import { Filter } from '../types/Filters';
import { Todo } from '../types/Todo';

type Props = {
  status: Filter;
  setStatus: Dispatch<SetStateAction<Filter>>;
  unfulfilledTodos?: Todo[];
};

export const TodoFooter: React.FC<Props> = props => {
  const { status, setStatus, unfulfilledTodos } = props;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {unfulfilledTodos?.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: status === Filter.All })}
          data-cy="FilterLinkAll"
          onClick={() => setStatus(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: status === Filter.Active })}
          data-cy="FilterLinkActive"
          onClick={() => setStatus(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: status === Filter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setStatus(Filter.Completed)}
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
