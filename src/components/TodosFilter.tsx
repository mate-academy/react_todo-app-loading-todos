import React from 'react';
import classNames from 'classnames';

import { Status, Todo } from '../types/Todo';

const filterButtons = [
  { address: '#/', name: Status.All },
  { address: '#/active', name: Status.Active },
  { address: '#/completed', name: Status.Completed },
];

type Props = {
  todos: Todo[];
  status: Status,
  areAllActiveTodos: boolean
  setStatus: (status: Status) => void;
  setErrorType: (erroType: null) => void;
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  status,
  areAllActiveTodos,
  setStatus,
  setErrorType,
}) => {
  const activeTodos = [...todos].filter(todo => !todo.completed);

  const handleOnClick = (filter: Status) => {
    setStatus(filter);
    setErrorType(null);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filterButtons.map(({ address, name }) => (
          <a
            key={name}
            href={address}
            className={classNames(
              'filter__link',
              { selected: name === status },
            )}
            data-cy={`FilterLink${name}`}
            onClick={() => handleOnClick(name)}
          >
            {name}
          </a>
        ))}
      </nav>

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
