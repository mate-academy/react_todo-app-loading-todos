import React from 'react';
import { FilterType } from '../constants/filters';
import { Filter } from './Filters';

type Props = {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  todosLeft: number;
};

export const Footer: React.FC<Props> = ({
  filter,
  onFilterChange,
  todosLeft,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosLeft} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <Filter filter={filter} onFilterChange={onFilterChange} />
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled
      >
        Clear completed
      </button>
    </footer>
  );
};
