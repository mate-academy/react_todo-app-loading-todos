import React from 'react';
import cn from 'classnames';

interface FooterProps {
  activeTodos: number;
  completedTodos: number;
  filter: string;
  setFilter: (newFilter: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  activeTodos,
  completedTodos,
  filter,
  setFilter,
}) => {
  const handleFilterClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    filterType: string,
  ) => {
    event.preventDefault();
    setFilter(filterType);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: !filter,
          })}
          data-cy="FilterLinkAll"
          onClick={(event) => handleFilterClick(event, '')}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={(event) => handleFilterClick(event, 'active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={(event) => handleFilterClick(event, 'completed')}
        >
          Completed
        </a>
      </nav>

      {completedTodos && (
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
