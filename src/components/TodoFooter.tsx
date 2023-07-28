import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { FilteredBy } from '../types/FilteredBy';

type Props = {
  todos: Todo[];
  filterBy: string;
  setFilterBy: React.Dispatch<React.SetStateAction<FilteredBy>>;
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  filterBy,
  setFilterBy,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterBy === FilteredBy.ALL,
          })}
          onClick={() => setFilterBy(FilteredBy.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterBy === FilteredBy.ACTIVE,
          })}
          onClick={() => setFilterBy(FilteredBy.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterBy === FilteredBy.COMPLETED,
          })}
          onClick={() => setFilterBy(FilteredBy.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
