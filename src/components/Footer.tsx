import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/Todo';

enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type FooterProps = {
  todos: Todo[],
  filteredTodoList: (todos: Todo[]) => void,
};

export const Footer: React.FC<FooterProps> = ({ todos, filteredTodoList }) => {
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const handleFilterClick = (selectedFilter: Filter) => {
    if (todos.length) {
      switch (selectedFilter) {
        case Filter.Active:
          filteredTodoList(todos.filter(todo => !todo.completed));
          break;

        case Filter.Completed:
          filteredTodoList(todos.filter(todo => todo.completed));
          break;

        case Filter.All:
        default:
          filteredTodoList(todos);
      }
    }

    setFilter(selectedFilter);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === Filter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleFilterClick(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === Filter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleFilterClick(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === Filter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleFilterClick(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      {todos.some(todo => todo.completed) && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
