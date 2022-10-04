import React from 'react';
import classnames from 'classnames';
import { FilterTypes } from '../types/FilterType';
import { Todo } from '../types/Todo';

type Props = {
  getFilterTodo: (param: FilterTypes) => void;
  filteredTodos: Todo[];
  selectedTab: FilterTypes
};

export const Footer: React.FC<Props> = ({
  getFilterTodo,
  filteredTodos,
  selectedTab,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${filteredTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          // key={}
          data-cy="FilterLinkAll"
          href="#/"
          className={classnames(
            'filter__link',
            {
              selected: selectedTab === FilterTypes.All,
            },
          )}
          onClick={() => getFilterTodo(FilterTypes.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classnames(
            'filter__link',
            {
              selected: selectedTab === FilterTypes.Active,
            },
          )}
          onClick={() => getFilterTodo(FilterTypes.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classnames(
            'filter__link',
            {
              selected: selectedTab === FilterTypes.Completed,
            },
          )}
          onClick={() => getFilterTodo(FilterTypes.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
