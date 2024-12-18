import React from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

type Props = {
  todos: Todo[];
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  handleClearCompleted: () => void;
  loading: boolean;
};

export const Footer: React.FC<Props> = ({
  todos,
  filter,
  setFilter,
  handleClearCompleted,
  loading,
}) => {
  const activeTodos = todos.filter(todo => !todo.completed).length;

  const filters = Object.values(Filter).map(value => ({
    value,
    label: value,
    href: `#/${value.toLowerCase()}`,
    dataCy: `FilterLink${value}`,
  }));

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map(({ value, label, href, dataCy }) => (
          <a
            key={value}
            href={href}
            className={`filter__link ${filter === value ? 'selected' : ''}`}
            data-cy={dataCy}
            onClick={() => setFilter(value)}
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={todos.every(todo => !todo.completed) || loading}
      >
        Clear completed
      </button>
    </footer>
  );
};
