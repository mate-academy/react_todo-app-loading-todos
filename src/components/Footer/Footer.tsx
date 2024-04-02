import React from 'react';
import { FilterBy } from '../../types/FilterBy';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  onFilterByClick: (filterByValue: FilterBy) => void;
  todos: Todo[];
  filterBy: FilterBy;
};

export const Footer: React.FC<Props> = ({
  onFilterByClick,
  todos,
  filterBy,
}) => {
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterBy === FilterBy.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onFilterByClick(FilterBy.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterBy === FilterBy.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => onFilterByClick(FilterBy.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterBy === FilterBy.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilterByClick(FilterBy.Completed)}
        >
          Completed
        </a>
      </nav>

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
