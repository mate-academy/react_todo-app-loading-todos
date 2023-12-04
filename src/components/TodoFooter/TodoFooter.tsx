import React, { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

type Props = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
  isCompleted: boolean,
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  setTodos,
  isCompleted,
}) => {
  const [filterStatus, setFilterStatus] = useState<Filter>(Filter.All);

  const activeTodos = [...todos].filter(todo => !todo.completed);
  const completedTodos = [...todos].filter(todo => todo.completed);

  const handleOnClick = (status: Filter) => {
    switch (status) {
      case 'Active':
        setTodos(activeTodos);
        setFilterStatus(Filter.Active);
        break;

      case 'Completed':
        setTodos(completedTodos);
        setFilterStatus(Filter.Completed);
        break;
      default:
        setTodos(todos);
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
            selected: filterStatus === 'All',
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleOnClick(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterStatus === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleOnClick(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterStatus === 'Completed',
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
