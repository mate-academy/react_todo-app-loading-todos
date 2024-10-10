import { Todo } from '../types/Todo';
import { TodoFilter } from './TodoFilter';
import { FilteredTodos } from '../enums/FilteredTodos';
import React from 'react';

interface Props {
  setFilterSelected: (filterSelected: FilteredTodos) => void;
  filterSelected: FilteredTodos;
  activeTodos: Todo[];
  completedTodos: Todo[];
}

export const TodoFooter: React.FC<Props> = ({
  setFilterSelected,
  filterSelected,
  activeTodos,
  completedTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <TodoFilter
        setFilterSelected={setFilterSelected}
        filterSelected={filterSelected}
      />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos.length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
