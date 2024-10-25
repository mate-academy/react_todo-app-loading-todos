import React from 'react';
import { SelectOption } from '../../App';
import cn from 'classnames';

type Props = {
  option: SelectOption;
  setOption: (o: SelectOption) => void;
};

export const FooterFilter: React.FC<Props> = ({ option, setOption }) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={cn('filter__link', {
          selected: option === SelectOption.All,
        })}
        data-cy="FilterLinkAll"
        onClick={() => setOption(SelectOption.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', {
          selected: option === SelectOption.Active,
        })}
        data-cy="FilterLinkActive"
        onClick={() => setOption(SelectOption.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: option === SelectOption.Completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => setOption(SelectOption.Completed)}
      >
        Completed
      </a>
    </nav>
  );
};
