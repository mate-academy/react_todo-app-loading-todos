import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  lengthOfUncompletedTodos: number;
  handleChangeFilter: (filter: string) => void;
  selectedFilter: string;
  completedTodos: Todo[];
};

const filters = ['all', 'active', 'completed'];

const Footer: React.FC<Props> = ({
  lengthOfUncompletedTodos,
  handleChangeFilter,
  selectedFilter,
  completedTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${lengthOfUncompletedTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map(filter => {
          const uppercasedFilter =
            filter.charAt(0).toUpperCase() + filter.slice(1, filter.length)

          return (
            <a
              href={`#/${filter}`}
              className={`filter__link ${selectedFilter === filter && 'selected'}`}
              data-cy={`FilterLink` + uppercasedFilter}
              onClick={() => handleChangeFilter(filter)}
              key={filter}
            >
              {uppercasedFilter}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
