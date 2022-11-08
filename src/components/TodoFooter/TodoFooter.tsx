import React from 'react';
import { TodoNav } from '../TodoNav';
import { FilterBy } from '../../types/FilterBy';

type Props = {
  itemsLeft: number;
  filterBy: FilterBy;
  handleFilter: (filter: FilterBy) => void;
};

export const TodoFooter: React.FC<Props>
= React.memo(({ itemsLeft, filterBy, handleFilter }) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="todosCounter">
      {`${itemsLeft} items left`}
    </span>
    <TodoNav filterBy={filterBy} handleFilter={handleFilter} />
    <button
      data-cy="ClearCompletedButton"
      type="button"
      className="todoapp__clear-completed"
    >
      Clear completed
    </button>
  </footer>
));
