import React from 'react';
import classNames from 'classnames';
import { Filters } from '../Filters/Filters';
import { StatusFilter } from '../../types/Todo';

// Footer component
export const Footer: React.FC<{
  incompleteTodosCount: number;
  filter: StatusFilter;
  setFilter: React.Dispatch<React.SetStateAction<StatusFilter>>
}> = ({ incompleteTodosCount, filter, setFilter }) => (
  <footer
    className={classNames(
      'todoapp__footer',
      {
        hidden: incompleteTodosCount === 0,
      },
    )}
    data-cy="Footer"
  >
    {incompleteTodosCount > 0 && (
      <>
        {/* ... Counter, Filters, and Clear Completed button ... */}
        <span className="todo-count" data-cy="TodosCounter">
          {`${incompleteTodosCount} ${incompleteTodosCount === 1 ? 'item' : 'items'} left`}
        </span>
        <Filters filter={filter} setFilter={setFilter} />
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      </>
    )}
  </footer>
);
