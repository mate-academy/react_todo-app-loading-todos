import React from 'react';
import { FilterValues } from '../types/FilterValues';

type Props = {
  countOfTodos: number,
  setFilterValue: (value: FilterValues) => void,
};

export const Footer: React.FC<Props> = ({ countOfTodos, setFilterValue }) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {countOfTodos}
        {' '}
        items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        {
          Object.entries(FilterValues).map(([key, value]) => (
            <button
              style={{ all: 'unset' }}
              key={value}
              value={value}
              onClick={() => setFilterValue(value)}
            >
              <a href={`#/${value}`} className="filter__link">
                {key}
              </a>
            </button>
          ))
        }
      </nav>

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
