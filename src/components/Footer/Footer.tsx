import React from 'react';
import { Filter } from '../../types/Filter';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  filterfield: Filter;
  setFilteredField: React.Dispatch<React.SetStateAction<Filter>>;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({
  filterfield,
  setFilteredField,
  todos,
}) => {
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterfield === Filter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilteredField(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterfield === Filter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilteredField(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterfield === Filter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilteredField(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
