import React from 'react';
import classNames from 'classnames';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  selectStatus: (status:TodoStatus)=> void;
  selectedStatus: TodoStatus;
};

export const StatusFilter: React.FC<Props> = ({
  selectStatus,
  selectedStatus,
}) => {
  const handleButton = (status:TodoStatus) => selectStatus(status);

  const statuses = Object.keys(TodoStatus);

  return (
    <nav className="filter">
      {statuses.map(status => (
        <a
          href="#/"
          key={status}
          className={classNames(
            'filter__link', {
              selected: selectedStatus === TodoStatus[status],
            },
          )}
          onClick={() => handleButton(TodoStatus[status])}
        >
          {status}
        </a>
      ))}
    </nav>

  );
};
