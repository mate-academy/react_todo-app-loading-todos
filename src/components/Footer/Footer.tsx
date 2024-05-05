import React, { useEffect, useState } from "react";
import { Todo } from "../../types/Todo";
import cn from 'classnames';

interface Props {
  todos: Todo[];
  setFilteredTodos: (b: Todo[]) => void;
  setTodos: (b: Todo[]) => void;
}

export const Footer = ({ todos, setFilteredTodos, setTodos }: Props) => {
  const [filtered, setFiltered] = useState('all');

  useEffect(() => {
    switch (filtered) {
      case 'active': setFilteredTodos(todos.filter(todo => !todo.completed)); break;
      case 'completed': setFilteredTodos(todos.filter(todo => todo.completed)); break;
      default: setFilteredTodos(todos);
    }
  }, [filtered])

  const Clear = () => {
    setTodos(todos.filter(todo => !todo.completed));
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      {/* Hide the footer if there are no todos */}
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {'selected': filtered === 'all'})}
          data-cy="FilterLinkAll"
          onClick={() => setFiltered('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {'selected': filtered === 'active'})}
          data-cy="FilterLinkActive"
          onClick={() => setFiltered('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {'selected': filtered === 'completed'})}
          data-cy="FilterLinkCompleted"
          onClick={() => setFiltered('completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
        <button
          disabled={todos.every(todo => !todo.completed)}
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={Clear}
        >
          Clear completed
        </button>

    </footer>
  );
}