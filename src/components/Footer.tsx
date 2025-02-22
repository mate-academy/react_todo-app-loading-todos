import classNames from 'classnames';
import React from 'react';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

interface FooterProps {
  todos: Todo[];
  todosLeft: number;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  loading: boolean;
}

const Footer: React.FC<FooterProps> = ({
  todos,
  todosLeft,
  filter,
  onFilterChange,
  loading,
}) => {
  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todosLeft} item{todosLeft !== 1 ? 's' : ''} left
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            {Object.values(Filter).map(f => (
              <a
                key={f}
                href={`#/${f}`}
                className={classNames('filter__link', {
                  selected: filter === f,
                })}
                data-cy={`FilterLink${f.charAt(0).toUpperCase() + f.slice(1)}`}
                onClick={() => onFilterChange(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={loading || !todos.some(todo => todo.completed)}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};

export default Footer;
