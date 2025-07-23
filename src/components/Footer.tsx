import React from 'react';
import { Todo } from '../types/Todo';
import { FilterType } from '../App';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  activeTodos: number;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  handleClearCompleted: () => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  activeTodos,
  setFilter,
  filter,
  handleClearCompleted,
}) => {
  const filters = [
    {
      label: 'All',
      type: FilterType.All,
      href: '#/',
      dataCy: 'FilterLinkAll',
    },
    {
      label: 'Active',
      type: FilterType.Active,
      href: '#/active',
      dataCy: 'FilterLinkActive',
    },
    {
      label: 'Completed',
      type: FilterType.Completed,
      href: '#/completed',
      dataCy: 'FilterLinkCompleted',
    },
  ];
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filters.map(({ label, type, href, dataCy }) => (
          <a
            key={type}
            href={href}
            className={cn('filter__link', { selected: filter === type })}
            data-cy={dataCy}
            onClick={() => setFilter(type)}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todos.some(todo => todo.completed)}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
