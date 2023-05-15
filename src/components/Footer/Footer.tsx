import React, { FC } from 'react';
import classNames from 'classnames';
import { Filter } from '../../types/FilterConditions';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  filter: Filter;
  onChangeFilter: (filter: Filter) => void;
}

export const Footer: FC<Props> = ({ todos, filter, onChangeFilter }) => {
  const handleFilterClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const target = event.target as HTMLAnchorElement;
    const currentFilter = target.textContent as Filter;

    onChangeFilter(currentFilter);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todos.length} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: Filter.All === filter,
          })}
          onClick={handleFilterClick}
        >
          {Filter.All}
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: Filter.Active === filter,
          })}
          onClick={handleFilterClick}
        >
          {Filter.Active}
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: Filter.Completed === filter,
          })}
          onClick={handleFilterClick}
        >
          {Filter.Completed}
        </a>
      </nav>

      {todos.some(todo => todo.completed) && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
