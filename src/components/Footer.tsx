import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';
import React, { SetStateAction, Dispatch } from 'react';

type FooterProps = {
  todos: Todo[];
  filterType: FilterType;
  setFilter: Dispatch<SetStateAction<FilterType>>;
};

const filtersButtons = ['All', 'Active', 'Completed'];

export const Footer: React.FC<FooterProps> = ({
  todos,
  filterType,
  setFilter,
}) => {
  const activeTodos = todos.filter(t => !t.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filtersButtons.map(type => (
          <a
            key={type}
            href={`#/${type !== 'All' ? type : ''}`}
            className={`filter__link ${filterType === type ? 'selected' : ''}`}
            data-cy={`FilterLink${type}`}
            onClick={() => setFilter(type as FilterType)}
          >
            {type}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={true}
      >
        Clear completed
      </button>
    </footer>
  );
};
