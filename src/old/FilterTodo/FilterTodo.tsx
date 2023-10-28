/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import cn from 'classnames';

enum FilterOption {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

const OPTIONS = [FilterOption.All, FilterOption.Completed, FilterOption.Active];

export const FilterTodo: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState(FilterOption.All);

  return (
    <nav className="filter" data-cy="Filter">
      {OPTIONS.map(option => {
        const isSelected = selectedOption === option;

        return (
          <a
            href={`#/${option.toLowerCase()}`}
            data-cy={`FilterLink${option}`}
            className={cn(
              'filter__link',
              { selected: isSelected },
            )}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </a>
        );
      })}
    </nav>
  );
};
