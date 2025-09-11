import React from 'react';
import { FilterType } from '../types/Todo';
import { Filter } from './Filter';

type Props = {
  itemsLeft: number;
  filterType: string;
  onFilterClick: (type: FilterType) => void;
};

export const Footer: React.FC<Props> = ({
  itemsLeft,
  filterType,
  onFilterClick,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeft} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <Filter filterType={filterType} onFilterClick={onFilterClick} />

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
