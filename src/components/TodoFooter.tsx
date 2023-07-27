import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

const enum FilteredBy {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

function getFilteredTodos(todos: Todo[], filterBy: FilteredBy) {
  let preparedTodos = [...todos];

  if (filterBy === 'active') {
    preparedTodos = todos.filter(todo => !todo.completed);
  }

  if (filterBy === 'completed') {
    preparedTodos = todos.filter(todo => todo.completed);
  }

  return preparedTodos;
}

export const TodoFooter: React.FC<Props> = ({ todos, setFilteredTodos }) => {
  const [filterBy, setFilterBy] = useState(FilteredBy.ALL);

  useEffect(() => {
    const visibleTodos = getFilteredTodos(todos, filterBy);

    setFilteredTodos(visibleTodos);
  }, [filterBy, todos]);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            'filter__link selected': filterBy === FilteredBy.ALL,
          })}
          onClick={() => setFilterBy(FilteredBy.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            'filter__link selected': filterBy === FilteredBy.ACTIVE,
          })}
          onClick={() => setFilterBy(FilteredBy.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            'filter__link selected': filterBy === FilteredBy.COMPLETED,
          })}
          onClick={() => setFilterBy(FilteredBy.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
