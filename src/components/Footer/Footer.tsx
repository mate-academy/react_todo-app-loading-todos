import React from 'react';
import { FilterStatusType } from '../../types/FilterStatusType';
import cn from 'classnames';

type FooterProps = {
  filterStatus: FilterStatusType;
  setFilterStatus: (filterStatus: FilterStatusType) => void;
  isCompletedTodosExist: boolean;
  numberOfNotCompletedTodos: number;
};

export const Footer: React.FC<FooterProps> = ({
  filterStatus,
  setFilterStatus,
  isCompletedTodosExist,
  numberOfNotCompletedTodos,
}) => {
  const handleChangeFilterStatus = (filterStatusType: FilterStatusType) => {
    setFilterStatus(filterStatusType);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${numberOfNotCompletedTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterStatus === FilterStatusType.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleChangeFilterStatus(FilterStatusType.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterStatus === FilterStatusType.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleChangeFilterStatus(FilterStatusType.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterStatus === FilterStatusType.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleChangeFilterStatus(FilterStatusType.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isCompletedTodosExist}
      >
        Clear completed
      </button>
    </footer>
  );
};
