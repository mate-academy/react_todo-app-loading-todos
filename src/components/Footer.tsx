import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  filterBy: string;
  setFilterBy: (value: string) => void;
};

export const Footer: React.FC<Props> = ({ todos, filterBy, setFilterBy }) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {todos.filter(todo => !todo.completed).length}
        items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link',
            { selected: filterBy === 'All' })}
          onClick={() => setFilterBy('All')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link',
            { selected: filterBy === 'Active' })}
          onClick={() => setFilterBy('Active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link',
            { selected: filterBy === 'Completed' })}
          onClick={() => setFilterBy('Completed')}
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
}
