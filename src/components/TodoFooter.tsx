import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodoFilter } from '../types/TodoFilter';

type Props = {
  todos: Todo[];
  filter: TodoFilter;
  setFilter: (newFilter: TodoFilter) => void;
};

export const TodoFooter: React.FC<Props> = ({ todos, filter, setFilter }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.keys(TodoFilter).map((filterName) => (
          <a
            href={`#/${filterName}`}
            className={classNames('filter__link', {
              selected: filterName === filter,
            })}
            data-cy={`FilterLink${filterName}`}
            onClick={() => setFilter(filterName as TodoFilter)}
          >
            {filterName}
          </a>
        ))}
      </nav>

      {/* don't show this button if there are no completed todos */}
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
