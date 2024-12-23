import React, { Dispatch, SetStateAction } from 'react';
import { StatusFilter } from '../../types/StatusFilter';
import { makeStrCapitalize } from '../../utils/makeStrCapitalize';
import classNames from 'classnames';

type Props = {
  filter: StatusFilter;
  setFilter: Dispatch<SetStateAction<StatusFilter>>;
};

export const TodoFilter: React.FC<Props> = props => {
  const { filter, setFilter } = props;

  return (
    <nav className="filter" data-cy="Filter">
      {Object.values(StatusFilter).map(value => {
        return (
          <a
            key={value}
            href={`#/${value === StatusFilter.All ? '' : value}`}
            className={classNames('filter__link', {
              selected: value === filter,
            })}
            data-cy={`FilterLink${makeStrCapitalize(value)}`}
            onClick={() => setFilter(value)}
          >
            {makeStrCapitalize(value)}
          </a>
        );
      })}
    </nav>
  );
};
