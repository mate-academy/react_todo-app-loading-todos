import React from 'react';
import FilteredTodo from '../../types/FilteredTodo';
import classNames from 'classnames';

type Props = {
  changeVisibleTodos: (filterType: FilteredTodo) => void;
  filtered: FilteredTodo;
  uncompletedTodos: number;
};

export const Footer: React.FC<Props> = ({
  changeVisibleTodos,
  filtered,
  uncompletedTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {uncompletedTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(FilteredTodo).map(title => (
          <a
            key={title}
            href="#/"
            className={classNames('filter__link', {
              selected: filtered === title,
            })}
            data-cy={`FilterLink${title}`}
            onClick={() => changeVisibleTodos(title as FilteredTodo)}
          >
            {title}
          </a>
        ))}
      </nav>

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
