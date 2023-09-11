import classNames from 'classnames';

import React from 'react';
import { Status } from '../types/filterStatusENUM';
import { useTodo } from '../context/TodoContext';

type Props = {
  selectedFilter: string;
  selectTheFilter: (status: Status) => void;
};

export const Filter: React.FC<Props> = ({
  selectedFilter,
  selectTheFilter,
}) => {
  const {
    todosCompleted,
    todosUncompleted,
    deleteComplitedTodo,
  } = useTodo();

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {todosUncompleted === 1 ? (
          '1 item left'
        ) : (
          `${todosUncompleted} items left`
        )}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: selectedFilter === Status.All },
          )}
          onClick={() => selectTheFilter(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: selectedFilter === Status.Acctive },
          )}
          onClick={() => selectTheFilter(Status.Acctive)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: selectedFilter === Status.Completed },
          )}
          onClick={() => selectTheFilter(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      {todosCompleted && (
        <button
          type="button"
          className="todoapp__clear-completed"
          onClick={deleteComplitedTodo}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
