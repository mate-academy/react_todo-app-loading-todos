import classNames from 'classnames';
import React, { useState } from 'react';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
};

export const Footer: React.FC<Props> = ({
  todos,
}) => {
  const [filterType, setFilterType] = useState<Filter>(Filter.All);

  const filterList = Object.values(Filter)
    .filter(key => typeof key !== 'number');

  const countTodo = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${countTodo.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {/* <a
          data-cy="FilterLinkAll"
          href="#/"
          className="filter__link selected"
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className="filter__link"
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className="filter__link"
        >
          Completed
        </a> */}
        {filterList.map(filter => (
          <a
            href="#/"
            key={filter}
            data-cy={`FilterLink${filter}`}
            className={classNames('filter__link',
              { selected: filter === Filter[filterType] })}
            onClick={() => {
              setFilterType(Filter[filter]);
            }}
          >
            {filter}
          </a>
        ))}
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
};
