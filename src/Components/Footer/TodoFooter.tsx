import React, { Dispatch, SetStateAction } from 'react';
import cn from 'classnames';
import { Filter, filterValues } from '../../types/Filter';

type Props = {
  todosQuantity: number;
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
};

export const TodoFooter: React.FC<Props> = ({
  todosQuantity,
  filter,
  setFilter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todosQuantity} item${todosQuantity !== 1 && 's'} left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filterValues.map(currentFilter => {
          const letters = currentFilter.split('');
          const [first, ...elseLetters] = letters;
          const capital = first.toUpperCase();
          const displayedFilter = [capital, elseLetters.join('')].join('');

          return (
            <a
              key={currentFilter}
              href={`#/${currentFilter}`}
              className={cn('filter__link', {
                selected: filter === currentFilter,
              })}
              data-cy={`FilterLink${displayedFilter}`}
              onClick={() => setFilter(currentFilter)}
            >
              {displayedFilter}
            </a>
          );
        })}
      </nav>

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
