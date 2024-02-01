import { useContext, useState } from 'react';
import classNames from 'classnames';

import { TodoContext } from '../contexts/TodoContext';
import { TodoStatus } from '../types/TodoStatus';

export const Footer: React.FC = () => {
  const { todos, setFilters } = useContext(TodoContext);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleClick = (value: TodoStatus) => () => {
    setFilters({ status: value });
    setSelectedFilter(value);
  };

  const uncompletedTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${uncompletedTodos.length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          // className="filter__link selected"
          className={classNames(
            'filter__link',
            { selected: selectedFilter === 'all' },
          )}
          data-cy="FilterLinkAll"
          onClick={handleClick('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: selectedFilter === 'uncompleted' },
          )}
          data-cy="FilterLinkActive"
          onClick={handleClick('uncompleted')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: selectedFilter === 'completed' },
          )}
          data-cy="FilterLinkCompleted"
          onClick={handleClick('completed')}
        >
          Completed
        </a>
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
