import React, { useMemo } from 'react';
import cn from 'classnames';
import { FilterType } from '../types/filter';

interface Props {
  itemsAmount: number;
  filterType: FilterType;
  setFilterType: React.Dispatch<React.SetStateAction<FilterType>>;
  completedLength: number;
}

const filterOptions = [
  { type: FilterType.All, value: 'All' },
  { type: FilterType.Active, value: 'Active' },
  { type: FilterType.Completed, value: 'Completed' },
];

export const Footer: React.FC<Props> = ({
  itemsAmount,
  setFilterType,
  filterType,
  completedLength,
}) => {
  const currentFilterType = useMemo(() => filterType, [filterType]);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsAmount} items left`}
      </span>

      <nav className="filter">
        {filterOptions.map(({ type, value }) => (
          <a
            key={type}
            href={`#/${type.toLowerCase()}`}
            className={`filter__link ${cn({
              selected: currentFilterType === type,
            })}`}
            onClick={() => setFilterType(type)}
          >
            {value}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className={`todoapp__clear-completed${cn({
          '--hidden': !completedLength,
        })}`}
      >
        Clear completed
      </button>
    </footer>
  );
};
