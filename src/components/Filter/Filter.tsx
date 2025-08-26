import React from 'react';
import cn from 'classnames';
import { FilterBy } from '../../types/Filter';

type Props = {
  active: FilterBy;
  onChange: (f: FilterBy) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted?: () => void;
  hasTodos: boolean;
};

export const Filter: React.FC<Props> = ({
  active,
  onChange,
  activeCount,
  completedCount,
  onClearCompleted,
  hasTodos,
}) => {
  if (!hasTodos) {
    return null;
  }

  return (
    <footer className="footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <ul className="filters" data-cy="Filter">
        <li>
          <a
            href="#/"
            data-cy="FilterLinkAll"
            className={cn({ selected: active === FilterBy.All })}
            onClick={e => {
              e.preventDefault();
              onChange(FilterBy.All);
            }}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            data-cy="FilterLinkActive"
            className={cn({ selected: active === FilterBy.Active })}
            onClick={e => {
              e.preventDefault();
              onChange(FilterBy.Active);
            }}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            data-cy="FilterLinkCompleted"
            className={cn({ selected: active === FilterBy.Completed })}
            onClick={e => {
              e.preventDefault();
              onChange(FilterBy.Completed);
            }}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedCount === 0}
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
