import React from 'react';
import { FilterTodo } from '../../types/FilterTodo';
import classNames from 'classnames';

type Props = {
  changeVisibleTodos: (el: FilterTodo) => void;
  filtered: FilterTodo;
  uncompletedTodos: number;
};

export const Footer: React.FC<Props> = ({
  changeVisibleTodos,
  filtered,
  uncompletedTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {uncompletedTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {['All', 'Active', 'Completed'].map(title => (
          <a
            key={title}
            href="#/"
            className={classNames('filter__link', {
              selected: filtered === title,
            })}
            data-cy={`FilterLink${title}`}
            onClick={() => changeVisibleTodos(title as FilterTodo)}
          >
            {title}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
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
