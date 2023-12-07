import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { ErrorContext } from './ErrorsContext';

type Props = {
  todos: Todo[];
};
export const Footer : React.FC<Props> = ({ todos }) => {
  const [isActiv, setIsActiv] = useState('All');
  const { setIsError } = useContext(ErrorContext);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter(el => el.completed === false).length} items left`}

      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: isActiv === 'All' })}
          data-cy="FilterLinkAll"
          onMouseDown={() => {
            setIsActiv('All');
            setIsError(true);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: isActiv === 'Active' })}
          data-cy="FilterLinkActive"
          onMouseDown={() => {
            setIsError(true);
            setIsActiv('Active');
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', { selected: isActiv === 'Completed' })}
          data-cy="FilterLinkCompleted"
          onMouseDown={() => {
            setIsError(true);
            setIsActiv('Completed');
          }}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}

      <button
        disabled={!todos.some((el) => el.completed === true)}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onMouseDown={() => {
          setIsError(true);
        }}
      >
        Clear completed
      </button>

    </footer>
  );
};
