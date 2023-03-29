import classNames from 'classnames';
import React from 'react';
import { filterLinks } from '../../helper/filterLinks';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

type Props = {
  filter: Filter,
  onFilter: (filter: Filter) => void,
  completedTodos: Todo | undefined,
};

export const Footer: React.FC<Props> = ({
  filter,
  onFilter,
  completedTodos,
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

      {completedTodos && (
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
