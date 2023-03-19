import classNames from "classnames";
import React from "react";
import { FilterType } from "../types/FilterType";
import { Todo } from "../types/Todo";

type Props = {
  todos: Todo[],
  filterType: FilterType,
  setFilterType: (filterType: FilterType) => void,
};

export const Footer: React.FC<Props> = ({ todos, filterType, setFilterType }) => {
  const completedTodos = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
        <span className="todo-count">
          {`${completedTodos} items left`}
        </span>

        <nav className="filter">
          <a
            href="#/"
            className={classNames(
              'filter__link',
              { 'selected': filterType === FilterType.ALL }
            )}
            onClick={() => setFilterType(FilterType.ALL)}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames(
              'filter__link',
              { 'selected': filterType === FilterType.ACTIVE}
            )}
            onClick={() => setFilterType(FilterType.ACTIVE)}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames(
              'filter__link',
              { 'selected': filterType === FilterType.COMPLETED }
            )}
            onClick={() => setFilterType(FilterType.COMPLETED)}
          >
            Completed
          </a>
        </nav>

        {/* don't show this button if there are no completed todos */}
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
    </footer>
  );
}
