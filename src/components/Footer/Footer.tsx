import React from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';
import classNames from 'classnames';

type FooterProps = {
  todos: Todo[];
  filter: Filter;
  updateFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

const Footer: React.FC<FooterProps> = ({ todos, filter, updateFilter }) => {
  const handleFilterClick = (event: React.MouseEvent): void => {
    const element = event.target as HTMLElement;

    updateFilter(element.dataset.cy as Filter);
  };

  const activeNumbers = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeNumbers} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === 'FilterLinkAll',
          })}
          data-cy="FilterLinkAll"
          onClick={handleFilterClick}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === 'FilterLinkActive',
          })}
          data-cy="FilterLinkActive"
          onClick={handleFilterClick}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === 'FilterLinkCompleted',
          })}
          data-cy="FilterLinkCompleted"
          onClick={handleFilterClick}
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

export default Footer;
