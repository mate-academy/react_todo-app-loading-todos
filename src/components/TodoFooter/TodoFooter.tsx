import React from 'react';
import { Todo } from '../../types/Todo';
import { FilterStatus } from '../../types/FilterStatus';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  selectedStatus: FilterStatus;
  setSelectedStatus: (filterStatus: FilterStatus) => void;
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  // setTodos,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(FilterStatus).map(filterStatus => (
          <a
            href={`#/${filterStatus === FilterStatus.All ? '' : filterStatus.toLowerCase()}`}
            className={classNames('filter__link', {
              selected: filterStatus === selectedStatus,
            })}
            data-cy={`FilterLink${filterStatus}`}
            key={filterStatus}
            onClick={() => setSelectedStatus(filterStatus)}
          >
            {filterStatus}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
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
