import React from 'react';

type Props = {
  quantityActiveItems: number;
  statusFilter: string;
  onStatusFilter: (status: string) => void;
};

export const Footer: React.FC<Props> = ({
  quantityActiveItems,
  statusFilter,
  onStatusFilter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {quantityActiveItems} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${statusFilter === 'all' ? 'selected ' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => onStatusFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${statusFilter === 'active' ? 'selected ' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => onStatusFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${statusFilter === 'completed' ? 'selected ' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => onStatusFilter('completed')}
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
