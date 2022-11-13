import React from 'react';
import classNames from 'classnames';

import { TodoCount } from '../TodoCount/TodoCount';

import { Todo } from '../../types/Todo';
import { FilterStatus } from '../../types/FilterStatus';

interface Props {
  todos: Todo[];
  filterBy: FilterStatus;
  onFilterSelect: (filterType: FilterStatus) => void;
}

export const TodosFilter: React.FC<Props> = ({
  todos,
  filterBy,
  onFilterSelect: onFilter,
}) => {
  const hasCompletedTodo = todos.some(todo => todo.completed);
  const todosLeft = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <TodoCount todosLeft={todosLeft} />

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link', {
            selected: filterBy === FilterStatus.ALL,
          })}
          onClick={() => {
            onFilter(FilterStatus.ALL);
          }}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link', {
            selected: filterBy === FilterStatus.ACTIVE,
          })}
          onClick={() => {
            onFilter(FilterStatus.ACTIVE);
          }}
        >
          Active
        </a>

        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterBy === FilterStatus.COMPLETED,
          })}
          onClick={() => {
            onFilter(FilterStatus.COMPLETED);
          }}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        style={{
          visibility: hasCompletedTodo
            ? 'visible'
            : 'hidden',
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
