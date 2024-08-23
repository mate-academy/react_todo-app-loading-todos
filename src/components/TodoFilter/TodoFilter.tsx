import React from 'react';
import { Filter } from '../../types/Filter';
import classNames from 'classnames';

type Props = {
  status: Filter;
  onChange: (sortedField: Filter) => void;
};

export const TodoFilter: React.FC<Props> = ({ onChange, status }) => {
  return (
    <>
      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(value => (
          <a
            key={value}
            href="#/"
            className={classNames('filter__link', {
              selected: value === status,
            })}
            data-cy={`FilterLink${value}`}
            onClick={() => onChange(value)}
          >
            {value}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </>
  );
};
