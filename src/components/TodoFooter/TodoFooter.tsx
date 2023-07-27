import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { FilteredBy } from '../../types/FilteredBy';

type Props = {
  todos: Todo[],
  filteredBy: string,
  setFilteredBy: (value: FilteredBy) => void,
};
export const TodoFooter: React.FC<Props> = ({
  todos,
  filteredBy,
  setFilteredBy,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todos.length} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filteredBy === FilteredBy.All },
          )}
          onClick={() => setFilteredBy(FilteredBy.All)}
        >
          {FilteredBy.All}
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filteredBy === FilteredBy.Active },
          )}
          onClick={() => setFilteredBy(FilteredBy.Active)}
        >
          {FilteredBy.Active}
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filteredBy === FilteredBy.Completed },
          )}
        >
          {FilteredBy.Completed}
        </a>
      </nav>
      {
        todos.some(todo => todo.completed) && (
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        )
      }
    </footer>
  );
};
