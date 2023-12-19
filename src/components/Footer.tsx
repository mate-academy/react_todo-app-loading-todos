import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

interface Props {
  todos: Todo[],
  setFilterStatus: (filter: Filter) => void,
  isCompleted: boolean,
  filterStatus: Filter,
}

export const Footer: React.FC<Props> = ({
  todos,
  setFilterStatus,
  isCompleted,
  filterStatus,
}) => {
  const activeTodo = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodo.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link',
            { selected: filterStatus === Filter.All })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterStatus(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link',
            { selected: filterStatus === Filter.Active })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterStatus(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link',
            { selected: filterStatus === Filter.Completed })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterStatus(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      {isCompleted && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
