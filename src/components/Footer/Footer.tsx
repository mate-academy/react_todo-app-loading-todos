import React from 'react';
import { Filter } from '../Filter';
import { FilterSetting } from '../../types/FilterSetting';

type Props = {
  onFilter: (v: FilterSetting) => void;
  filter: FilterSetting;
  activeTodos: number;
  completedTodos: number;
};

export const Footer: React.FC<Props> = ({
  onFilter,
  filter,
  activeTodos,
  completedTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      <Filter onFilter={onFilter} filter={filter} />

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
