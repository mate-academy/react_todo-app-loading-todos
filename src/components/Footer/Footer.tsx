import { FC } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { FilterBy } from '../../types/FilterBy';

import { filterTodos } from '../../utils/FilterTodos';

interface Props {
  selectedFilter: FilterBy;
  todos: Todo[];
  onSelectFilter: (filter: FilterBy) => void;
}

const Footer: FC<Props> = ({ selectedFilter, todos, onSelectFilter }) => {
  const activeTodos = filterTodos(todos, FilterBy.ACTIVE);
  const completedTodos = filterTodos(todos, FilterBy.COMPLETED);

  const filters = Object.values(FilterBy).filter(filter => filter.length);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map(filter => (
          <a
            key={filter}
            href="#/"
            className={cn('filter__link', {
              selected: filter === selectedFilter,
            })}
            data-cy={`FilterLink${filter}`}
            onClick={() => onSelectFilter(filter)}
          >
            {filter}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedTodos.length}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
