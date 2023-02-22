import cn from 'classnames';
import React from 'react';
import { Filter } from '../../types/Filter';

interface Props {
  currentOption: Filter,
  setOption: (value: Filter) => void
}

const options = Object.values(Filter);

export const Footer:React.FC<Props> = React.memo(
  ({ currentOption, setOption }) => {
    return (
      <footer className="todoapp__footer">
        <span className="todo-count">
          3 items left
        </span>

        {/* Active filter should have a 'selected' class */}
        <nav className="filter">
          {options.map(option => (
            <a
              key={option}
              href={`#/${option}`}
              className={cn('filter__link', {
                selected: option === currentOption,
              })}
              onClick={() => setOption(option)}
            >
              {option}
            </a>
          ))}
        </nav>

        {/* don't show this button if there are no completed todos */}
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      </footer>
    );
  },
);
