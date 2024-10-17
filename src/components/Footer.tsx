import React from 'react';
import { Todo } from '../types/Todo';
import { getFilteredTodos } from '../utils/getFilteredTodo';
import { FilterType } from '../types/FilterType';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  filterBy: FilterType;
  setFilter: (filterBy: FilterType) => void;
};

export const Footer: React.FC<Props> = ({ todos, filterBy, setFilter }) => {
  const competedTodos = getFilteredTodos(todos, FilterType.completed);
  const activeTodos = getFilteredTodos(todos, FilterType.active);

  const filters = Object.values(FilterType);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map(filter => (
          <a
            href="#/"
            className={cn('filter__link', {
              selected: filterBy === filter,
            })}
            data-cy={`FilterLink${filter}`}
            onClick={() => setFilter(filter)}
            key={filter}
          >
            {filter}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!competedTodos.length}
      >
        Clear completed
      </button>
    </footer>
  );
};
