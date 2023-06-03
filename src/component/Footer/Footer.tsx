import React from 'react';
import { Todo } from '../../types/Todo';
import { FilteredBy } from '../../types/FilteredBy';
import classNames from 'classnames';

interface FooterProps {
  todos: Todo[]
  filteredBy: string;
  setFilteredBy: (option: FilteredBy) => void;
}
export const Footer: React.FC<FooterProps> = ({
  todos,
  filteredBy,
  setFilteredBy,
}) => {
  const todoCount = todos.filter((todo) => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todoCount} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filteredBy === FilteredBy.ALL },
          )}
          onClick={() => setFilteredBy(FilteredBy.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filteredBy === FilteredBy.ACTIVE },
          )}
          onClick={() => setFilteredBy(FilteredBy.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filteredBy === FilteredBy.COMPLETED },
          )}
          onClick={() => setFilteredBy(FilteredBy.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {/* Don't show this button if there are no completed todos */}
      {todos.some((todo) => todo.completed) && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
