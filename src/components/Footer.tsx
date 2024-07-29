import React from 'react';
import { Filter } from '../types/EnumFilter';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  filter: Filter[keyof Filter];
  onFilter: (filter: Filter[keyof Filter]) => void;
};

export const Footer: React.FC<Props> = ({ todos, filter, onFilter }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(filterValue => (
          <a
            key={filterValue}
            href="#/"
            className={classNames('filter__link', {
              selected: filter === filterValue,
            })}
            data-cy={`FilterLink${filterValue}`}
            onClick={() => onFilter(filterValue)}
          >
            {filterValue}
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
