import React, { memo } from 'react';
import classnames from 'classnames';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  filter: Filter;
  setFilter: (value: Filter) => void;
};

export const Footer: React.FC<Props> = memo(({ todos, filter, setFilter }) => {
  const activeTodos = todos.filter(({ completed }) => !completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {activeTodos}
        items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classnames('filter__link',
            { selected: filter === Filter.ALL })}
          onClick={() => setFilter(Filter.ALL)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classnames('filter__link',
            { selected: filter === Filter.ACTIVE })}
          onClick={() => setFilter(Filter.ACTIVE)}
        >
          Active
        </a>

        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classnames('filter__link', {
            selected: filter === Filter.COMPLETED,
          })}
          onClick={() => setFilter(Filter.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {activeTodos && (
        <button
          data-cy="ClearCompletedButton"
          type="button"
          className="todoapp__clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
});
