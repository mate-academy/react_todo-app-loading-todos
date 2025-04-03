import React from 'react';
import { FilterSelectType } from '../../types/FilterSelectType';

interface Props {
  fiilterIndex: number;
  index: number;
  hendleSelectFilter: (index: number) => void;
  filterSelect: FilterSelectType[];
  option: FilterSelectType;
}

export const FilterSelect: React.FC<Props> = React.memo(
  ({ fiilterIndex, hendleSelectFilter, filterSelect, index, option }) => {
    return (
      <a
        href={`#/${index ? filterSelect[index] : ''}`}
        className={`filter__link ${index === fiilterIndex ? 'selected' : ''}`}
        data-cy={`FilterLink${option}`}
        onClick={() => hendleSelectFilter(index)}
      >
        {option}
      </a>
    );
  },
);

FilterSelect.displayName = 'FilterSelect';
