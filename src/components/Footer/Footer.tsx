import React from 'react';
import cn from 'classnames';
import { FilterBy } from '../../types/Filter';
import { Todo } from '../../types/Todo';

type Props = {
  filterBy: FilterBy,
  todos: Todo[],
  setFilterBy: React.Dispatch<React.SetStateAction<FilterBy>>,
};

export const Footer: React.FC<Props> = React.memo((props) => {
  const { filterBy, todos, setFilterBy } = props;

  const countUncompletedTodo = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${countUncompletedTodo} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          data-cy="FilterLinkAll"
          className={cn(
            'filter__link',
            { selected: filterBy === FilterBy.All },
          )}
          onClick={() => setFilterBy(FilterBy.All)}
        >
          All
        </a>

        <a
          href="#/active"
          data-cy="FilterLinkActive"
          className={cn(
            'filter__link',
            { selected: filterBy === FilterBy.Active },
          )}
          onClick={() => setFilterBy(FilterBy.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          data-cy="FilterLinkCompleted"
          className={cn(
            'filter__link',
            { selected: filterBy === FilterBy.Completed },
          )}
          onClick={() => setFilterBy(FilterBy.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
});
