import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  setFirstFilter: (matching: string) => void;
  firstFilter: string;
  todos: Todo[];
  cleared: () => void;
};

export const Todofilter: React.FC<Props> = ({
  setFirstFilter,
  firstFilter,
  todos,
  cleared,
}) => {
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href={firstFilter === 'All' ? '#/active' : '#/'}
          className={
            firstFilter === 'All' ? 'filter__link selected' : 'filter__link'
          }
          data-cy="FilterLinkAll"
          onClick={() => setFirstFilter('All')}
        >
          All
        </a>

        <a
          href={firstFilter === 'Active' ? '#/active' : '#/'}
          className={
            firstFilter === 'Active' ? 'filter__link selected' : 'filter__link'
          }
          data-cy="FilterLinkActive"
          onClick={() => setFirstFilter('Active')}
        >
          Active
        </a>

        <a
          href={firstFilter === 'Completed' ? '#/Completed' : '#/'}
          className={
            firstFilter === 'Completed'
              ? 'filter__link selected'
              : 'filter__link'
          }
          data-cy="FilterLinkCompleted"
          onClick={() => setFirstFilter('Completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => cleared()}
      >
        Clear completed
      </button>
    </footer>
  );
};
