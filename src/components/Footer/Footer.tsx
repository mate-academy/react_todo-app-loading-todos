import React from 'react';
import { Filter } from '../../types/Filter';
import './Footer.scss';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  onFilter: (filter: Filter) => void;
  currentFilter: Filter;
  activeCount: number;
  doesCompletedExist: boolean;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const Footer: React.FC<Props> = React.memo(function Footer({
  onFilter,
  currentFilter,
  activeCount,
  doesCompletedExist,
  setTodos,
}) {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>
      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <button
          className={classNames('filter__link', {
            selected: currentFilter === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => onFilter('all')}
        >
          All
        </button>

        <button
          className={classNames('filter__link', {
            selected: currentFilter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => onFilter('active')}
        >
          Active
        </button>

        <button
          className={classNames('filter__link', {
            selected: currentFilter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilter('completed')}
        >
          Completed
        </button>
      </nav>
      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => {
          setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
        }}
        disabled={!doesCompletedExist}
      >
        Clear completed
      </button>
    </footer>
  );
});
