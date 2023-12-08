import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

type Props = {
  todos: Todo[],
  setFilterStatus: (filter: Filter) => void,
  isCompleted: boolean,
  filterStatus: Filter,
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  setFilterStatus,
  isCompleted,
  filterStatus,
}) => {
  const activeTodos = [...todos].filter(todo => !todo.completed);

  const handleOnClick = (status: Filter) => {
    switch (status) {
      case Filter.Active:
        setFilterStatus(Filter.Active);
        break;

      case Filter.Completed:
        setFilterStatus(Filter.Completed);
        break;
      default:
        setFilterStatus(Filter.All);
        break;
    }
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterStatus === Filter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleOnClick(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterStatus === Filter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleOnClick(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterStatus === Filter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleOnClick(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
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
