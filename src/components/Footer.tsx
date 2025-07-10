import React from 'react';

type Props = {
  activeCount: number;
  filter: string;
  setFilter: (filter: string) => void;
};

export const Footer: React.FC<Props> = ({ activeCount, filter, setFilter }) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeCount} items left
    </span>

    <nav className="filter" data-cy="Filter">
      {['all', 'active', 'completed'].map(f => (
        <a
          key={f}
          href={`#/${f}`}
          className={`filter__link ${filter === f ? 'selected' : ''}`}
          data-cy={`FilterLink${f[0].toUpperCase() + f.slice(1)}`}
          onClick={() => setFilter(f)}
        >
          {f[0].toUpperCase() + f.slice(1)}
        </a>
      ))}
    </nav>

    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled
    >
      Clear completed
    </button>
  </footer>
);
