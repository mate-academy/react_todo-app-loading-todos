import React from 'react';

import { Todo } from '../../types/Todo';

export enum FilterTypes {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type Props = {
  todos: Todo[]
  onFilterType: (type: FilterTypes) => void
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  onFilterType,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todos.length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className="filter__link"
          onClick={() => onFilterType(FilterTypes.All)}
          // value={FilterTypes.All}
        >
          All
        </a>

        <a
          href="#/active"
          className="filter__link"
          onClick={() => onFilterType(FilterTypes.Active)}
          // value={FilterTypes.Active}
        >
          Active
        </a>

        <a
          href="#/completed"
          className="filter__link"
          onClick={() => onFilterType(FilterTypes.Completed)}
          // value={FilterTypes.Completed}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
