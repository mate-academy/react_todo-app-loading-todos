import classNames from 'classnames';
import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  onSetFilterType: React.Dispatch<Filter>,
  activeTodos: number,
  completedTodos: number,
  filterType: Filter,
};

export const Footer: React.FC<Props> = ({
  onSetFilterType,
  activeTodos,
  completedTodos,
  filterType,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href={`#/${Filter.All}`}
          className={classNames(
            'filter__link',
            { selected: filterType === Filter.All },
          )}
          onClick={() => onSetFilterType(Filter.All)}
        >
          {Filter.All}
        </a>

        <a
          data-cy="FilterLinkActive"
          href={`#/${Filter.Active}`}
          className={classNames(
            'filter__link',
            { selected: filterType === Filter.Active },
          )}
          onClick={() => onSetFilterType(Filter.Active)}
        >
          {Filter.Active}
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href={`#/${Filter.Completed}`}
          className={classNames(
            'filter__link',
            { selected: filterType === Filter.Completed },
          )}
          onClick={() => onSetFilterType(Filter.Completed)}
        >
          {Filter.Completed}
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        disabled={completedTodos === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
