import cn from 'classnames';

import { useState, useContext } from 'react';
import { TodoContext } from './TodoContext';
import { Status } from '../types/Status';
import { filters } from '../constants/Filters';

export const TodoFilter: React.FC = () => {
  const { status, setStatus } = useContext(TodoContext);
  const [isSelected, setIsSelected] = useState<Status>(status);

  const handleFilterClick = (filterStatus: Status) => {
    setIsSelected(filterStatus);
    setStatus(filterStatus);
  };

  return (
    <nav className="filter" data-cy="Filter">
      {filters.map((filter) => (
        <a
          href={`#/${filter.link}`}
          className={cn('filter__link', {
            selected: isSelected === filter.link,
          })}
          onClick={() => handleFilterClick(filter.link)}
        >
          {filter.name}
        </a>
      ))}
    </nav>
  );
};
