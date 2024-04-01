import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type FilterType = 'All' | 'Active' | 'Completed';

type Props = {
  todos: Todo[];
  clearCompleted: () => void;
  isNoCompletedTodos: boolean;
  selectedFilter: string;
  onFilterChange: (filter: FilterType) => void;
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  clearCompleted,
  isNoCompletedTodos,
  selectedFilter,
  onFilterChange,
}) => {
  const activeTodosCount = () => {
    return todos.filter(todo => !todo.completed).length;
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount()} {activeTodosCount() === 1 ? 'item' : 'items'} left
      </span>
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectedFilter === 'All',
          })}
          data-cy="FilterLinkAll"
          onClick={() => {
            onFilterChange('All');
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selectedFilter === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => {
            onFilterChange('Active');
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selectedFilter === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            onFilterChange('Completed');
          }}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompleted}
        disabled={isNoCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
