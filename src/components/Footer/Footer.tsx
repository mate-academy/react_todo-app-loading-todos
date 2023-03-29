import classNames from 'classnames';
import React from 'react';
import { filterLinks } from '../../helper/filterLinks';
import { Filter } from '../../types/Filter';

type Props = {
  filter: Filter,
  onFilter: (filter: Filter) => void,
  hasCompleted: boolean | undefined,
};

export const Footer: React.FC<Props> = ({
  filter,
  onFilter,
  hasCompleted,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      <nav className="filter">
        {filterLinks.map(link => (
          <a
            key={link.title}
            href={`#/${link.url}`}
            className={classNames(
              'filter__link',
              { selected: filter === link.title },
            )}
            onClick={() => onFilter(link.title as Filter)}
          >
            {link.title}
          </a>
        ))}
      </nav>

      {hasCompleted && (
        <button
          type="button"
          className="todoapp__clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
