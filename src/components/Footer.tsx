import React from 'react';
import { FilterBy } from '../types/FilterBy';
import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  onGetFilterBy: React.Dispatch<React.SetStateAction<FilterBy>>;
  filterBy: FilterBy;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({ onGetFilterBy, filterBy, todos }) => {
  const links = Object.entries(FilterBy);

  const totalActiveTodos = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {totalActiveTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {links.map(([key, value]) => (
          <a
            href={`#/${value === 'all' ? '' : `${value}`}`}
            className={cn('filter__link', { selected: filterBy === value })}
            data-cy={'FilterLink' + `${key}`}
            key={key}
            onClick={() => onGetFilterBy(value)}
          >
            {key}
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
