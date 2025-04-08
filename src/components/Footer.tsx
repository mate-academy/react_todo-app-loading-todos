import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../types/Todo';
import { FilterBy } from '../types/FilterBy';
import classNames from 'classnames';

interface FooterProps {
  todos: Todo[];
  filterBy: FilterBy;
  setFilterBy: (filter: FilterBy) => void;
}

export const Footer: React.FC<FooterProps> = ({
  todos,
  filterBy,
  setFilterBy,
}) => {
  const amountOfActiveTodo = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodo = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {amountOfActiveTodo} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" aria-label="Todo Filters" data-cy="Filter">
        {Object.entries(FilterBy as Record<string, FilterBy>).map(
          ([filterKey, filterValue]) => (
            <a
              key={filterKey}
              href={`#/${filterValue}`}
              className={classNames('filter__link', {
                selected: filterBy === filterValue,
              })}
              data-cy={`FilterLink${filterKey}`}
              onClick={() => setFilterBy(filterValue)}
              aria-current={filterBy === filterValue ? 'page' : undefined}
            >
              {filterKey}
            </a>
          ),
        )}
      </nav>

      {/* This button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodo}
        aria-disabled={!hasCompletedTodo}
      >
        Clear completed
      </button>
    </footer>
  );
};

// PropTypes for runtime type checking
Footer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  filterBy: PropTypes.oneOf(Object.values(FilterBy)).isRequired,
  setFilterBy: PropTypes.func.isRequired,
};
