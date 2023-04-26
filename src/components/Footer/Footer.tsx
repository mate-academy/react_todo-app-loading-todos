import React, { FC } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

type Props = {
  todos: Todo[];
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

export const Footer: FC<Props> = ({ todos, filter, setFilter }) => {
  const handleOnClickFilter = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    setFilter(event.currentTarget.innerText as Filter);
  };

  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {activeTodos.length === 1 ? '1 item left' : `${activeTodos.length} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          onClick={handleOnClickFilter}
          className={classNames('filter__link', {
            selected: filter === Filter.ALL,
          })}
        >
          {Filter.ALL}
        </a>

        <a
          href="#/active"
          onClick={handleOnClickFilter}
          className={classNames('filter__link', {
            selected: filter === Filter.ACTIVE,
          })}
        >
          {Filter.ACTIVE}
        </a>

        <a
          href="#/completed"
          onClick={handleOnClickFilter}
          className={classNames('filter__link', {
            selected: filter === Filter.COMPLETED,
          })}
        >
          {Filter.COMPLETED}
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
