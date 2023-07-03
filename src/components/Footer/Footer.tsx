import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

const filterLinks = [
  { name: 'All', way: '' },
  { name: 'Active', way: 'active' },
  { name: 'Completed', way: 'completed' },
];

interface FooterProps {
  todosLeftToFinish: Todo[],
  setSelectedFilter: (filterNames: string) => void,
  selectedFilter: string,
}

export const Footer: React.FC<FooterProps> = ({
  todosLeftToFinish,
  setSelectedFilter,
  selectedFilter,
}) => {
  const handleSelectedFilter = (todosSelected: string) => {
    setSelectedFilter(todosSelected);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todosLeftToFinish.length} items left`}
      </span>

      <nav className="filter">
        {filterLinks.map(link => (
          <a
            key={link.name}
            href={`#/${link.way}`}
            className={classNames('filter__link', {
              selected: link.name === selectedFilter,
            })}
            onClick={() => handleSelectedFilter(link.name)}
          >
            {link.name}
          </a>
        ))}
      </nav>

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
