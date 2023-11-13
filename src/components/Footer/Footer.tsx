import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

// import '../../styles/filter.scss';

type Props = {
  todos: Todo[];
  filterBy: string;
  setFilterBy: (filter: Filter) => void;
};

export enum Filter {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const Footer: React.FC<Props> = ({ todos, filterBy, setFilterBy }) => {
  const todosLeftCount = todos.filter(todo => !todo.completed).length;
  const isClearButtonShown = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todosLeftCount} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterBy === Filter.all,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterBy(Filter.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterBy === Filter.active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterBy(Filter.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterBy === Filter.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterBy(Filter.completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isClearButtonShown}
      >
        Clear completed
      </button>
    </footer>
  );
};
