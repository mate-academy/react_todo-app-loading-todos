import React from 'react';
import { Todo } from '../types/Todo';

enum FilterType {
  FILTERED_ACTIVE = 'Active',
  FILTERED_COMPLETED = 'Completed',
  CLEAR_COMPLETED = 'Clear completed',
  UNFILTERED = 'All',
}
//
type Props = {
  errorMessage: string;
  todos: Todo[];
  todoCount: number;
  setFilterBy: React.Dispatch<React.SetStateAction<FilterType>>;
  handleClearCompleted: (completed: Todo[]) => void;
  completedTasks: Todo[];
};

export const Filter: React.FC<Props> = ({
  errorMessage,
  todos,
  todoCount,
  setFilterBy,
  handleClearCompleted,
  completedTasks,
}) => {
  return (
    <>
      {!errorMessage && todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${todoCount} items left`}
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className="filter__link selected"
              data-cy="FilterLinkAll"
              onClick={() => {
                setFilterBy(FilterType.UNFILTERED);
              }}
            >
              All
            </a>

            <a
              href="#/active"
              className="filter__link"
              data-cy="FilterLinkActive"
              onClick={() => {
                setFilterBy(FilterType.FILTERED_ACTIVE);
              }}
            >
              Active
            </a>

            <a
              href="#/completed"
              className="filter__link"
              data-cy="FilterLinkCompleted"
              onClick={() => {
                setFilterBy(FilterType.FILTERED_COMPLETED);
              }}
            >
              Completed
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={() => {
              handleClearCompleted(completedTasks);
            }}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
