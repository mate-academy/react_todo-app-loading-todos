import React from 'react';
import { FilterType } from '../types/FilterType';
import classNames from 'classnames';

type FooterProps = {
  activeCount: number;
  filter: FilterType;
  handleFilterChange: (newFilter: FilterType) => void;
  onClearCompleted: () => void;
  hasCompleted: boolean;
};

export const Footer: React.FC<FooterProps> = ({
  activeCount,
  filter,
  handleFilterChange: handleFilterChange,
  onClearCompleted,
  hasCompleted,
}) => {
  const filterOption = Object.values(FilterType);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filterOption.map(option => {
          const label = option.charAt(0).toUpperCase() + option.slice(1);

          return (
            <a
              key={option}
              href={`#/${option}`}
              className={classNames('filter__link', {
                selected: filter === option,
              })}
              data-cy={`FilterLink${label}`}
              onClick={() => handleFilterChange(option)}
            >
              {label}
            </a>
          );
        })}
      </nav>

      {/* this button should be disabled if there are no completed todos
            эту кнопку следует отключить, если нет завершенных задач */}
      {hasCompleted && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
