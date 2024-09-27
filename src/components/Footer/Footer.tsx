import React from 'react';

import { FilterOptions } from '../../types/FilterOptions';
import { Filter } from '../Filter/Filter';

type Props = {
  counter: number;
  filterOption: FilterOptions;
  onFilter: (value: FilterOptions) => void;
  isClearButtonShowing: boolean;
};

export const Footer: React.FC<Props> = ({
  counter,
  filterOption,
  onFilter,
  isClearButtonShowing,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {counter} items left
      </span>

      <Filter filterOption={filterOption} onFilter={onFilter} />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isClearButtonShowing}
      >
        Clear completed
      </button>
    </footer>
  );
};
