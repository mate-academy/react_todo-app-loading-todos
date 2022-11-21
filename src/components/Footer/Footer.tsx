import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { CompletedStatus } from '../../types/CompletedStatus';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setFilteredTodos: (arr: Todo[]) => void;
};

export const Footer: React.FC<Props> = ({ todos, setFilteredTodos }) => {
  const [selectedStatus, setSelectedStatus] = useState(CompletedStatus.ALL);

  const filterByComplete = () => {
    return [...todos].filter(todo => {
      switch (selectedStatus) {
        case CompletedStatus.ACTIVE:
          return !todo.completed;
        case CompletedStatus.COMPLETED:
          return todo.completed;
        default:
          return todo;
      }
    });
  };

  useCallback(() => setFilteredTodos(filterByComplete()), [selectedStatus]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        4 items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            { selected: selectedStatus === CompletedStatus.ALL },
          )}
          onClick={() => setSelectedStatus(CompletedStatus.ALL)}
        >
          {CompletedStatus.ALL}
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: selectedStatus === CompletedStatus.ACTIVE },
          )}
          onClick={() => setSelectedStatus(CompletedStatus.ACTIVE)}
        >
          {CompletedStatus.ACTIVE}
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: selectedStatus === CompletedStatus.COMPLETED },
          )}
          onClick={() => setSelectedStatus(CompletedStatus.COMPLETED)}
        >
          {CompletedStatus.COMPLETED}
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
