import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  showFilteredTodos: (array: Todo[]) => void;
};

enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const Footer: React.FC<Props> = ({ todos, showFilteredTodos }) => {
  const [todosLeft, setTodosLeft] = useState(todos.length);
  const [currentFilter, setCurrentFilter] = useState<Filter>(Filter.ALL);

  const allTodos = () => {
    setCurrentFilter(Filter.ALL);

    setTodosLeft(todos.length);
    showFilteredTodos(todos);
  };

  const activeTodos = () => {
    const filteredArray = todos.filter(todo => !todo.completed);

    setCurrentFilter(Filter.ACTIVE);
    setTodosLeft(filteredArray.length);
    showFilteredTodos(filteredArray);
  };

  const completedTodos = () => {
    const filteredArray = todos.filter(todo => todo.completed);

    setCurrentFilter(Filter.COMPLETED);
    setTodosLeft(filteredArray.length);
    showFilteredTodos(filteredArray);
  };

  useEffect(() => {
    showFilteredTodos(todos);
  }, []);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosLeft} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link', { selected: currentFilter === Filter.ALL },
          )}
          onClick={allTodos}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link', { selected: currentFilter === Filter.ACTIVE },
          )}
          onClick={activeTodos}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link', { selected: currentFilter === Filter.COMPLETED },
          )}
          onClick={completedTodos}
        >
          Completed
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
