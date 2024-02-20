import classNames from 'classnames';
import React from 'react';
import { Status } from '../types/Status';

type Props = {
  status: Status;
  setStatus: (v: Status) => void;
  completed: number;
};

export const TodoFooter: React.FC<Props> = ({
  status,
  setStatus,
  completed,
}) => {
  const handleChangeStatus = (statusValue: Status) => {
    setStatus(statusValue);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${completed} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Status).map(statusValue => (
          <a
            key={statusValue}
            href={`#${statusValue.toLowerCase()}`}
            className={classNames('filter__link', {
              selected: status === statusValue,
            })}
            data-cy={`FilterLink${statusValue}`}
            onClick={() => handleChangeStatus(statusValue)}
          >
            {statusValue}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
