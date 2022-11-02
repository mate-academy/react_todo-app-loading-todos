import React from 'react';
import { FilterBy } from '../types/FilterBy';

import { Filter } from './Filter';

type Props = {
  leftTodos: number,
  filterBy: FilterBy,
  setFilterBy: React.Dispatch<React.SetStateAction<FilterBy>>,
};

export const Footer: React.FC<Props> = ({
  leftTodos,
  filterBy,
  setFilterBy,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${leftTodos} items left`}
      </span>

      <Filter
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
