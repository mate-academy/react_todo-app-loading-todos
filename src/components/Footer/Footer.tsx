import React from 'react';
import { FilterTypes } from '../../types/FilterTypes';
import { Todo } from '../../types/Todo';
import Filters from '../../constants/Filter';

interface Props {
  todos: Todo[];
  activeTodos: number;
  filter: FilterTypes;
  setFilterBy: (filter: FilterTypes) => void;
  onClearCompleted: () => void;
}

const Footer: React.FC<Props> = ({
  todos,
  activeTodos,
  filter,
  setFilterBy,
  onClearCompleted,
}) => {
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Filters.map(({ label, value, cy, href }) => (
          <a
            key={value}
            href={href}
            className={`filter__link ${filter === value ? 'selected' : ''}`}
            data-cy={cy}
            onClick={e => {
              e.preventDefault();
              setFilterBy(value);
            }}
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
