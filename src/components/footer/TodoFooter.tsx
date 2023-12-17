import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TypeOfFilter } from '../../types/TypeOfFilters';

interface Props {
  todos: Todo[],
  filter: TypeOfFilter,
  setFilter: (value: TypeOfFilter) => void
}

export const TodoFooter: React.FC<Props> = ({
  todos,
  filter,
  setFilter,
}) => {
  const active = todos.filter(todo => !todo.completed);
  const completed = todos.filter(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${active.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link',
            { selected: filter === TypeOfFilter.All })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(TypeOfFilter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link',
            { selected: filter === TypeOfFilter.Active })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(TypeOfFilter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link',
            { selected: filter === TypeOfFilter.Completed })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(TypeOfFilter.Completed)}
        >
          Completed
        </a>
      </nav>

      {!!completed.length && (
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
