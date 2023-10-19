import { useState } from 'react';

import cn from 'classnames';
import { useTodosState } from '../../contexts/TodosContext';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  setIsFilterBy: (filterBy: TodoStatus) => void;
};

export const TodoFooter: React.FC<Props> = ({ setIsFilterBy }) => {
  const [todos] = useTodosState();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const activeTodos = todos.filter(todo => !todo.completed).length;
  const hasSomeCompletedTodos = todos.some(todo => todo.completed);

  const handleFilterClick = (status: TodoStatus) => {
    setSelectedFilter(status);
    setIsFilterBy(status);
  };

  const matchStatusHref = (status: TodoStatus): string => {
    switch (status) {
      case TodoStatus.Active:
        return '#/active';
      case TodoStatus.Completed:
        return '#/completed';
      case TodoStatus.All:
      default:
        return '#/';
    }
  };

  const matchDataCy = (status: TodoStatus): string => {
    switch (status) {
      case TodoStatus.Active:
        return 'FilterLinkActive';
      case TodoStatus.Completed:
        return 'FilterLinkCompleted';
      case TodoStatus.All:
      default:
        return 'FilterLinkAll';
    }
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(TodoStatus).map(status => (
          <a
            key={status}
            href={matchStatusHref(status)}
            className={cn('filter__link', {
              selected: selectedFilter === status,
            })}
            data-cy={matchDataCy(status)}
            onClick={() => handleFilterClick(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasSomeCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
