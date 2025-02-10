/* eslint-disable no-console */
import React from 'react';
import classNames from 'classnames';
import FilterStatus from '../enums/FilterStatus';
import { Todo } from '../types/Todo';

interface FooterProps {
  todos: Todo[];
  filterStatus: FilterStatus;
  setFilterStatus: (status: FilterStatus) => void;
}

export const Footer: React.FC<FooterProps> = ({
  todos,
  filterStatus,
  setFilterStatus,
}) => {
  const activeTodoCount = todos.filter(todo => !todo.completed).length;

  const filterLinks = Object.values(FilterStatus).map(status => (
    <a
      key={status}
      href={`#/${status}`}
      className={classNames('filter__link', {
        selected: filterStatus === status,
      })}
      data-cy={`FilterLink${status.charAt(0).toUpperCase() + status.slice(1)}`}
      onClick={() => setFilterStatus(status)}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </a>
  ));

  const handleClearCompleted = () => {
    console.log('Clear completed todos');
  };

  const clearCompletedButton = (
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      onClick={handleClearCompleted}
      disabled={!todos.some(todo => todo.completed)}
    >
      Clear completed
    </button>
  );

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodoCount} items left
      </span>
      <nav className="filter" data-cy="Filter">
        {filterLinks}
      </nav>
      {clearCompletedButton}
    </footer>
  );
};
