import React from 'react';
import classNames from 'classnames';
import { TypeTodo } from '../../types/Todo';
import { FilterType } from '../../types/FilterType';

interface Props {
  filterStatus: (type: FilterType) => void,
  filterType: FilterType,
  todos: TypeTodo[],
};

export const Footer: React.FC<Props> = ({
  filterStatus, filterType, todos
}) => {
  const notCompletedCount = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedCount} item{notCompletedCount === 1 ? '' : 's'} left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { 'selected': filterType === FilterType.All }
          )}
          data-cy="FilterLinkAll"
          onClick={() => filterStatus(FilterType.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { 'selected': filterType === FilterType.Active }
          )}
          data-cy="FilterLinkActive"
          onClick={() => filterStatus(FilterType.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { 'selected': filterType === FilterType.Completed }
          )}
          data-cy="FilterLinkCompleted"
          onClick={() => filterStatus(FilterType.Completed)}
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
