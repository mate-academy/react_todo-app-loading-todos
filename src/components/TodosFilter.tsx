import React, { useState } from 'react';
import classNames from 'classnames';

import { Status, Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  areAllActiveTodos: boolean
  setVisibleTodos: (todos: Todo[]) => void;
  setErrorType: (erroType: null) => void;
};

export const TodosFilter: React.FC<Props> = ({
  todos,
  areAllActiveTodos,
  setVisibleTodos,
  setErrorType,
}) => {
  const [visibleStatus, setVisibleStatus] = useState(Status.All);

  const activeTodos = [...todos].filter(todo => !todo.completed);
  const completedTodos = [...todos].filter(todo => todo.completed);

  const handleOnClick = (status: Status) => {
    switch (status) {
      case 'Completed':
        setVisibleTodos(completedTodos);
        setVisibleStatus(Status.Completed);
        break;

      case 'Active':
        setVisibleTodos(activeTodos);
        setVisibleStatus(Status.Active);
        break;

      default:
        setVisibleTodos(todos);
        setVisibleStatus(Status.All);
    }

    setErrorType(null);
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
          className={classNames(
            'filter__link',
            { selected: visibleStatus === 'All' },
          )}
          data-cy="FilterLinkAll"
          onClick={() => handleOnClick(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: visibleStatus === 'Active' },
          )}
          data-cy="FilterLinkActive"
          onClick={() => handleOnClick(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: visibleStatus === 'Completed' },
          )}
          data-cy="FilterLinkCompleted"
          onClick={() => handleOnClick(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      {!areAllActiveTodos && (
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
