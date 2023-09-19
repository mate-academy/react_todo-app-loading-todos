import React from 'react';
import cn from 'classnames';
import { TodosFilter } from '../types/TodosFilter';

const setFilterHref = (filter: TodosFilter) => {
  switch (filter) {
    case TodosFilter.Active:
      return '#/active';

    case TodosFilter.Completed:
      return '#/completed';

    case TodosFilter.All:
    default:
      return '#/';
  }
};

type Props = {
  filter: TodosFilter;
  uncopmletedTodos: number;
  onFilterChange: (filter: TodosFilter) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  onFilterChange,
  uncopmletedTodos,
}) => (
  <footer className="todoapp__footer">
    {/* Hide the footer if there are no todos */}
    <span className="todo-count">
      {`${uncopmletedTodos} items left`}
    </span>

    {/* Active filter should have a 'selected' class */}
    <nav className="filter">
      {Object.values(TodosFilter).map((value) => (
        <a
          href={setFilterHref(value)}
          className={cn('filter__link', { selected: value === filter })}
          key={value}
          onClick={() => {
            onFilterChange(value as TodosFilter);
          }}
        >
          {value}
        </a>
      ))}
    </nav>

    {/* don't show this button if there are no completed todos */}
    <button type="button" className="todoapp__clear-completed">
      Clear completed
    </button>
  </footer>
);
