import React from 'react';
import { Todo } from '../../types/Todo';
import { FilterSelectType } from '../../types/FilterSelectType';
import { FilterSelect } from '../FilterSelect';

interface Props {
  todos: Todo[];
  filterSelect: FilterSelectType[];
  fiilterIndex: number;
  hendleSelectFilter: (index: number) => void;
  handleClearCompleted: () => void;
  checkTodoCompleted: () => number;
}

export const Footer: React.FC<Props> = React.memo(
  ({
    todos,
    filterSelect,
    fiilterIndex,
    hendleSelectFilter,
    handleClearCompleted,
    checkTodoCompleted,
  }) => {
    return (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {todos.filter(todo => !todo.completed).length} items left
        </span>

        <nav className="filter" data-cy="Filter">
          {filterSelect.map((option, index) => (
            <FilterSelect
              key={option}
              option={option}
              index={index}
              fiilterIndex={fiilterIndex}
              filterSelect={filterSelect}
              hendleSelectFilter={hendleSelectFilter}
            />
          ))}
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={handleClearCompleted}
          disabled={!checkTodoCompleted()}
        >
          Clear completed
        </button>
      </footer>
    );
  },
);

Footer.displayName = 'Footer';
