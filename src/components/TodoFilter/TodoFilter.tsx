import React from 'react';
import classNames from 'classnames';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  filter: TodoStatus;
  setFilter: (v: TodoStatus) => void;
};

export const TodoFilter: React.FC<Props> = React.memo(({
  filter, setFilter,
}) => {
  return (
    <nav className="filter">
      <a
        href="#/"
        className={classNames(
          'filter__link',
          { selected: filter === TodoStatus.All },
        )}
        onClick={() => setFilter(TodoStatus.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames(
          'filter__link',
          { selected: filter === TodoStatus.Active },
        )}
        onClick={() => setFilter(TodoStatus.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames(
          'filter__link',
          { selected: filter === TodoStatus.Completed },
        )}
        onClick={() => setFilter(TodoStatus.Completed)}
      >
        Completed
      </a>
    </nav>
  );
});
