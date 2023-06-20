import React from 'react';

import { Todo } from '../../types/Todo';

export enum FilterTypes {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type Props = {
  todos: Todo[]
  onFilterType: (e: any) => void
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
        <button
          type="button"
          // href="#/"
          className="filter__link"
          onClick={onFilterType}
          value={FilterTypes.All}
        >
          All
        </button>

        <button
          type="button"
          // href="#/active"
          className="filter__link"
          onClick={onFilterType}
          value={FilterTypes.Active}
        >
          Active
        </button>

        <button
          type="button"
          // href="#/completed"
          className="filter__link"
          onClick={onFilterType}
          value={FilterTypes.Completed}
        >
          Completed
        </button>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
