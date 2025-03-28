import React from 'react';
import { FilterBy } from '../../types/enums';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  filterQwery: FilterBy;
  setFilterQwery: (qwery: FilterBy) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  filterQwery,
  setFilterQwery,
}) => {
  const activeCount = todos.filter(item => !item.completed).length || 0;
  const isSomeDone = todos.some(item => item.completed);
  const filterOptions: (keyof typeof FilterBy)[] = Object.keys(
    FilterBy,
  ) as (keyof typeof FilterBy)[];

  // console.log('render footer');

  const filterChange = (input: FilterBy) => {
    const value = input;

    if (!value) {
      return;
    }

    setFilterQwery(value);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filterOptions.map(item => {
          const filterValue = FilterBy[item];

          return (
            <a
              href="#/"
              key={item}
              className={`filter__link ${filterQwery === filterValue && 'selected'}`}
              data-cy={filterValue}
              onClick={e =>
                filterChange(e.currentTarget.dataset.cy as FilterBy)
              }
            >
              {item}
            </a>
          );
        })}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isSomeDone}
      >
        Clear completed
      </button>
    </footer>
  );
};
