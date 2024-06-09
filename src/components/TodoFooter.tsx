import React from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export const TodoFooter: React.FC<Props> = ({ todos, filter, setFilter }) => {
  const todosLeft = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todosLeft} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === Filter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(Filter.All)}
        >
          {Filter.All}
        </a>

        <a
          href="#/active"
          className={classNames('filter_link', {
            selected: filter === Filter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(Filter.Active)}
        >
          {Filter.Active}
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === Filter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(Filter.Completed)}
        >
          {Filter.Completed}
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
