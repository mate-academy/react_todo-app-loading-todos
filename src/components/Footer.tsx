import React from 'react';
import { Filter } from './Filter';
import { FilterType } from '../types/FilterType';

type Props = {
  selected: FilterType;
  counter: number;
  onSelect: (filter: FilterType) => void;
};

export const Footer: React.FC<Props> = ({ selected, counter, onSelect }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {counter} items left
      </span>

      <Filter selected={selected} onSelect={onSelect} />

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
