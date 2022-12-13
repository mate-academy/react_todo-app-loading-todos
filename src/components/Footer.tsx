import React from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import { FilterTodo } from './FilterTodo';

interface Props {
  todos: Todo[],
  filter: Filter,
  setFilter: (filter: Filter) => void;
}

export const Footer: React.FC<Props> = ({ todos, filter, setFilter }) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="todosCounter">
      {`${todos.length} items left`}
    </span>

    <nav className="filter" data-cy="Filter">
      <FilterTodo
        filter={filter}
        setFilter={setFilter}
        filterType={Filter.All}
        filterLink="FilterLinkAll"
      />

      <FilterTodo
        filter={filter}
        setFilter={setFilter}
        filterType={Filter.Active}
        filterLink="FilterLinkActive"
      />

      <FilterTodo
        filter={filter}
        setFilter={setFilter}
        filterType={Filter.Completed}
        filterLink="FilterLinkCompleted"
      />
    </nav>

    <button
      data-cy="ClearCompletedButton"
      type="button"
      className="todoapp__clear-completed"
    >
      Clear completed
    </button>
  </footer>
);
